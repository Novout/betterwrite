import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { AuthSet } from './set'

export const AuthPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'oauth' }, [AuthSet])
