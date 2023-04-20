import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginDropSet } from './drop'
import { PluginHandlerSet } from './handler'

export const WindowPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'window' }, [PluginHandlerSet, PluginDropSet])
