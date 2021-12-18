import { createPlugin } from 'better-write-plugin-core'
import { PluginThemeSet } from './set'

export const ThemePlugin = () =>
  createPlugin({ name: 'theme' }, [PluginThemeSet])
