import { PluginTypes } from 'better-write-types'

export const PluginHandlerSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  emitter.on('call-editor-mounted', () => {
    // for set color in all entities with character exists
    hooks.characters.handler()

    hooks.emitter.on(
      'characters-handler',
      ({ index, inner }: { index: number; inner: string }) => {
        hooks.characters.handler(index, inner)
      }
    )
  })
}
