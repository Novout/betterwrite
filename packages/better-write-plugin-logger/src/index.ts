import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginLoggerActions } from './actions'
import { PluginLoggerProject } from './project'
import { PluginLoggerConsole } from './console'

export const LoggerPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'logger' }, [
    PluginLoggerActions,
    PluginLoggerProject,
    PluginLoggerConsole,
  ])
