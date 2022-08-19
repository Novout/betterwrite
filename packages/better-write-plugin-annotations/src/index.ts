import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginAnnotationsSet } from './set'

export const AnnotationsPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'annotations' }, [PluginAnnotationsSet])
