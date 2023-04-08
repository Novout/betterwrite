import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { InitSet } from './init'

export const ShortcutsPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'shortcuts' }, [InitSet])
