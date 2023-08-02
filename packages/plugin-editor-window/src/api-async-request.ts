import { PluginTypes } from 'better-write-types'

export const PluginAPIAsyncRequest = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  emitter.on('call-editor-mounted', () => {
    setTimeout(() => {
      if (stores.EDITOR.styles.googleFontsInjection)
        emitter.emit('plugin-pdf-init')
    }, 1000)
  })
}
