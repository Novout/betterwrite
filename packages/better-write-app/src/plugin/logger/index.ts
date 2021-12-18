import { PluginTypes } from 'better-write-types'
import { PluginLoggerActions } from './actions'
import { PluginLoggerProject } from './project'
import { createPlugin } from 'better-write-plugin-core'

export const LoggerPlugin = () =>
  createPlugin({ name: 'logger' }, [PluginLoggerActions, PluginLoggerProject])
