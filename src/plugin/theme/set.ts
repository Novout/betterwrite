import { PluginStores } from '@/types/plugin/core'
import { PluginEmitter } from '@/types/plugin/core'
import { mounted } from '../core/cycle'
import { ThemeNormalize } from './utils'

export const PluginThemeSet = (
  emitter: PluginEmitter,
  stores: PluginStores
) => {
  mounted(() => {
    setTimeout(() => {
      const theme = stores.EDITOR.configuration.theme

      const value = ThemeNormalize(theme)

      document.body.classList.add(value)
    }, 0)
  })
}
