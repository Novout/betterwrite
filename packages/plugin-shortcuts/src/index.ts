import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { GlobalSet } from './global'

export const ShortcutsPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'shortcuts' }, [GlobalSet])
