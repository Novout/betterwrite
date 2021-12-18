import { PluginTypes } from 'better-write-types'
import { PluginLoggerActions } from './actions'
import { PluginLoggerProject } from './project'

export const LoggerPlugin = (): PluginTypes.Plugin => {
  const defines = {
    name: 'logger',
  } as PluginTypes.PluginDefines

  const init = (
    emitter: PluginTypes.PluginEmitter,
    stores: PluginTypes.PluginStores
  ) => {
    PluginLoggerActions(emitter, stores)
    PluginLoggerProject(emitter, stores)
  }

  return { init, defines }
}
