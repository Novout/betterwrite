import { PluginTypes } from 'better-write-types'

export const PluginHandlerSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  emitter.on('call-editor-mounted', () => {
    hooks.vueuse.core.useEventListener('dragover', (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    })

    hooks.vueuse.core.useEventListener('drop', (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()

      hooks.plugin.emit('plugin-window-drop', event)
    })
  })
}
