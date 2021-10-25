import { Plugin, PluginEmitter, PluginStores } from '@/types/plugin/core'
import { PluginLoggerActions } from './actions'
import { PluginLoggerProject } from './project'

export const LoggerPlugin = (): Plugin => {
  const init = (emitter: PluginEmitter, stores: PluginStores) => {
    PluginLoggerActions(emitter, stores)
    PluginLoggerProject(emitter, stores)
  }

  return { init }
}
