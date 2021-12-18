import { Cycle } from 'better-write-plugin-core'
import { PluginTypes } from 'better-write-types'
import { setContentTheme } from './external'
import { ThemeNormalize } from './utils'

export const PluginThemeSet = (
  emitter: PluginTypes.PluginEmitter,
  stores: PluginTypes.PluginStores
) => {
  Cycle.onAfterMounted(() => {
    const theme = stores.EDITOR.configuration.theme

    const value = ThemeNormalize(theme)

    setContentTheme(value)
  })
}
