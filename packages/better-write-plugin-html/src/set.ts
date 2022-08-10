import { saveAs } from 'file-saver'
import { PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { useNProgress } from '@vueuse/integrations'
import { ContextState } from 'better-write-types'
import { Entity } from 'better-write-types'
import { HEADING_ONE, HTML, PARAGRAPH } from './tags'

export const PluginHtmlSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const { isLoading } = useNProgress()

  const entities = () => {
    const paragraph = (entity: Entity) => {
      return hooks.raw
        .v2()
        .block()
        .text()
        .parse(entity.raw)
        .map((text: string) => {
          return PARAGRAPH(text)
        })
    }

    return { paragraph }
  }

  const content = () => {
    let str: string = ''

    stores.PROJECT.pages.forEach((page: ContextState) => {
      page.entities.forEach((entity: Entity) => {
        switch (entity.type) {
          case 'paragraph':
          case 'list':
          case 'checkbox':
            entities()
              .paragraph(entity)
              ?.forEach((paragraph: string) => {
                str += hooks.substitution.purge(paragraph) + '\n'
              })
            break
          case 'heading-one':
            str += HEADING_ONE(entity.raw) + '\n'
            break
          case 'heading-two':
            // arr.push(entities().headingTwo(entity.raw))
            break
          case 'heading-three':
            // arr.push(entities().headingThree(entity.raw))
            break
          case 'page-break':
            // arr.push(entities().pageBreak())
            break
          case 'line-break':
            // arr.push(entities().lineBreak())
            break
        }
      })
    })

    return HTML(str)
  }

  On.externals().PluginHtmlGenerate(emitter, [
    () => {
      isLoading.value = true

      const data = new Blob([content()], { type: 'text/html' })

      saveAs(data, hooks.project.utils().exportFullName('html'))

      isLoading.value = false

      hooks.toast.success(hooks.i18n.t('toast.project.html.generate'))
    },
    () => {},
  ])
}
