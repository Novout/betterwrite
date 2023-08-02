import { PluginTypes } from 'better-write-types'
import { watch } from 'vue-demi'

export const PluginWatcherSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  emitter.on('call-editor-created', () => {
    // tracking normalize project cases
    watch(
      stores.ABSOLUTE.$state,
      async () => {
        await hooks.storage.normalize()
      },
      { deep: true },
    )
  })
}
