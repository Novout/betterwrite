import { PluginStores } from '@/types/plugin/core'
import { PluginEmitter } from '@/types/plugin/core'
import { onAfterMounted } from '../core/cycle'
import { ThemeNormalize } from './utils'

export const PluginThemeSet = (
  emitter: PluginEmitter,
  stores: PluginStores
) => {
  onAfterMounted(() => {
    const theme = stores.EDITOR.configuration.theme

    const value = ThemeNormalize(theme)

    document.body.classList.add(value)
  })
}
