import { PluginTypes } from 'better-write-types'
import { computed } from 'vue-demi'

export const PluginSeoSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  emitter.on('call-editor-created', () => {
    const title = computed(() => hooks.i18n.t('seo.editor.title'))
    const description = computed(() => hooks.i18n.t('seo.editor.description'))

    hooks.vueuse.head({
      title,
      meta: [
        {
          name: `description`,
          content: description,
        },
      ],
    })
  })
}
