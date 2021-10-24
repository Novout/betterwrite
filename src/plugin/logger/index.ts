import { Plugin, PluginEmitter, PluginStores } from '@/types/plugin/core'
import { PluginLoggerActions } from './actions'

export const LoggerPlugin = (): Plugin => {
  const init = (emitter: PluginEmitter, stores: PluginStores) => {
    PluginLoggerActions(emitter, stores)
  }

  return { init }
}
