import { PluginTypes } from 'better-write-types'
import { computed } from 'vue-demi'

export const PluginSeoSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  emitter.on('call-editor-created', () => {
    // dynamic head title
    const title = computed(() => hooks.i18n.t('seo.editor.title'))
    const description = computed(() => hooks.i18n.t('seo.editor.description'))
    const _title = computed(() =>
      stores.PROJECT.nameRaw === hooks.env.projectEmpty() ||
      !stores.CONTEXT.entities[0] ||
      stores.CONTEXT.entities[0].raw === hooks.env.emptyLine() ||
      hooks.entity.utils().isFixed(0)
        ? title.value
        : stores.PROJECT.nameRaw +
          (stores.CONTEXT.entities[0]?.raw ? ' - ' : '') +
          stores.CONTEXT.entities[0]?.raw,
    )
    hooks.vueuse.head.useHead({
      title: _title,
      meta: [
        {
          name: `description`,
          content: description,
        },
      ],
    })
  })
}
