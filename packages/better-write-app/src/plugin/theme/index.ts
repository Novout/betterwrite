import { PluginTypes } from 'better-write-types'
import { PluginThemeSet } from './set'

export const ThemePlugin = (): PluginTypes.Plugin => {
  const defines = {
    name: 'theme',
  } as PluginTypes.PluginDefines

  const init = (
    emitter: PluginTypes.PluginEmitter,
    stores: PluginTypes.PluginStores
  ) => {
    PluginThemeSet(emitter, stores)
  }

  return { init, defines }
}
