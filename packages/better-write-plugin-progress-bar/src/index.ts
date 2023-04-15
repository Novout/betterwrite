import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { ControllerSet } from './controller'

export const ProgressBarPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'progress-bar' }, [ControllerSet])
