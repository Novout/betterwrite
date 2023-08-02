import { PluginTypes } from 'better-write-types'

export const PluginThemeSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  emitter.on('call-editor-mounted', () => {
    const params = hooks.vueuse.core.useUrlSearchParams()

    if (params.context !== 'force')
      hooks.project.onLoadProject(undefined, false).then(() => {})
    else params.context = 'default'

    if (params.theme === 'custom' && stores.EDITOR.styles.base.backgroundData)
      emitter.emit('plugin-theme-set', 'BetterWrite - Custom')
  })

  emitter.on('call-editor-created', () => {
    emitter.emit('plugin-theme-set')
  })
}
