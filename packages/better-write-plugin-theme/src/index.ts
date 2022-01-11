import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginThemeContent } from './set'

export const ThemePlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'theme' }, [PluginThemeContent])

export * from './external'
