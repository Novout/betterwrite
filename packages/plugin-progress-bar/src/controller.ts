import { On } from 'better-write-plugin-core'
import { PluginTypes } from 'better-write-types'
import { useNProgress } from '@vueuse/integrations/useNProgress'

export const ControllerSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks
) => {
  const { isLoading, done, progress, start } = useNProgress(null, {
    minimum: 0.2,
  })

  On.externals().PluginProgressStart(emitter, [
    () => {
      // circular watcher case
      if (isLoading.value) return

      start()
    },
    () => {},
  ])

  On.externals().PluginProgressChange(emitter, [
    (value: number) => {
      // circular watcher case
      if (isLoading.value) return

      if (value > 1.0 || value < 0.0) return

      progress.value = value
    },
    () => {},
  ])

  On.externals().PluginProgressEnd(emitter, [
    () => {
      if (isLoading.value) done(true)
    },
    () => {},
  ])
}
