import {
  Plugin,
  PluginDefines,
  PluginEmitter,
  PluginStores,
} from '@/types/plugin/core'
import { PluginThemeSet } from './set'

export const ThemePlugin = (): Plugin => {
  const defines = {
    name: 'theme',
  } as PluginDefines

  const init = (emitter: PluginEmitter, stores: PluginStores) => {
    PluginThemeSet(emitter, stores)
  }

  return { init, defines }
}
