import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginTxtSet } from './set'

export const TxtPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'txt' }, [PluginTxtSet])
