import { PluginStores } from '@/types/plugin/core'
import { PluginEmitter } from '@/types/plugin/core'
import { mounted } from '../core/cycle'
import { useDefines } from '@/use/defines'
import { useLocalStorage } from '@/use/storage/local'
import { ThemeNormalize } from './utils'

export const PluginThemeSet = (
  emitter: PluginEmitter,
  stores: PluginStores
) => {
  mounted(() => {
    const local = useLocalStorage()
    const defines = useDefines()

    const theme = stores.EDITOR.configuration.theme

    const value = ThemeNormalize(theme)

    document.body.classList.add(value)
  })
}
