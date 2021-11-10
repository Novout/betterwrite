import { PluginStores } from '@/types/plugin/core'
import { PluginEmitter } from '@/types/plugin/core'
import { mounted } from '../core/cycle'
import { useDefines } from '../../use/defines'
import { useLocalStorage } from '@/use/storage/local'

export const PluginThemeSet = (
  emitter: PluginEmitter,
  stores: PluginStores
) => {
  mounted(() => {
    const local = useLocalStorage()
    const defines = useDefines()

    const base = defines.themes()[1]

    const theme = stores.EDITOR.configuration.theme

    document.body.classList.add(theme)
  })
}
