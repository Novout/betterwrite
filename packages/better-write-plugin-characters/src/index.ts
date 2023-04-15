import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { BackgroundColorSet } from './color'

export const CharactersPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'characters' }, [BackgroundColorSet])
