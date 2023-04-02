import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginEpubSet } from './set'

export const EpubPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'epub' }, [PluginEpubSet])
