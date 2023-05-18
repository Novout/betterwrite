import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginSchemasSet } from './set'

export const SchemasPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'schemas' }, [PluginSchemasSet])
