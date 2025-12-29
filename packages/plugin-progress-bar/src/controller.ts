import { On } from 'better-write-plugin-core'
import { PluginTypes } from 'better-write-types'

export const ControllerSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores,
  hooks: PluginTypes.PluginHooks,
) => {
  // TODO: make another nprogress

  On.externals().PluginProgressStart(emitter, [
    () => {
    },
    () => {},
  ])

  On.externals().PluginProgressChange(emitter, [
    (value: number) => {
    },
    () => {},
  ])

  On.externals().PluginProgressEnd(emitter, [
    () => {
    },
    () => {},
  ])
}
