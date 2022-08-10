import { saveAs } from 'file-saver'
import { PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
import { useNProgress } from '@vueuse/integrations'
import { ContextState } from 'better-write-types'
import { Entity } from 'better-write-types'
import {
  CHECKBOX,
  DRAU,
  HEADING_ONE,
  HEADING_THREE,
  HEADING_TWO,
  HTML,
  IMAGE,
  LINE_BREAK,
  LIST,
  PAGE_BREAK,
  PARAGRAPH,
} from './tags'

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
            str += HEADING_TWO(entity.raw) + '\n'
            break
          case 'heading-three':
            str += HEADING_THREE(entity.raw) + '\n'
            break
          case 'page-break':
            str += PAGE_BREAK() + '\n'
            break
          case 'line-break':
            str += LINE_BREAK() + '\n'
            break
          case 'image':
            str += IMAGE(entity.raw) + '\n'
            break
          case 'drau':
            str += DRAU(entity.raw) + '\n'
            break
          case 'list':
            str += hooks.substitution.purge(LIST(entity.raw)) + '\n'
            break
          case 'checkbox':
            str += hooks.substitution.purge(CHECKBOX(entity)) + '\n'
            break
        }
      })
    })

    return HTML(str, hooks.storage.getProjectObject())
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
