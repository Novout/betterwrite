import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { BackgroundSet } from './background'

export const WebGLPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'webgl' }, [BackgroundSet])
