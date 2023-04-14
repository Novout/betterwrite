import { PluginTypes } from 'better-write-types'
import { computed, watch } from 'vue'

export const SilentLimitSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  watch(
    computed(() => stores.HISTORY.stack),
    (stack) => {
      if (stack.length >= 50) stores.HISTORY.stack.shift()
    },
    { deep: true }
  )
}
