import { saveAs } from 'file-saver'
import { PluginTypes } from 'better-write-types'
import { On } from 'better-write-plugin-core'
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
import { getRows } from 'better-write-contenteditable-ast'

export const PluginHtmlSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  const { isLoading } = hooks.vueuse.integration.progress

  const entities = () => {
    const paragraph = (entity: Entity) => {
      return getRows(entity.raw).map((text: string) => {
        return text.trim() !== ''
          ? PARAGRAPH(hooks.substitution.purge(text))
          : LINE_BREAK()
      })
    }

    return { paragraph }
  }

  const content = () => {
    let str: string = ''

    stores.PROJECT.chapters.forEach(({ entities: list }: ContextState) => {
      list.forEach((entity: Entity) => {
        switch (entity.type) {
          case 'paragraph':
            entities()
              .paragraph(entity)
              ?.forEach((paragraph: string) => {
                str += paragraph + '\n'
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
            str += LIST(hooks.substitution.purge(entity.raw)) + '\n'
            break
          case 'checkbox':
            entity.raw = hooks.substitution.purge(entity.raw)

            str += CHECKBOX(entity) + '\n'
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
