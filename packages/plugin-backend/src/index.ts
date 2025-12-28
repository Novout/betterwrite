import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { DataSet } from './data'

export const BackendPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'backend' }, [DataSet])
