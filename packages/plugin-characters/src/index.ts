import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginBackgroundColorSet } from './color'
import { PluginHandlerSet } from './handler'

export const CharactersPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'characters' }, [
    PluginHandlerSet,
    PluginBackgroundColorSet,
  ])
