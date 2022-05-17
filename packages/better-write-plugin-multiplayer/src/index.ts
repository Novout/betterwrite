import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginMultiplayerSet } from './set'

export const MultiplayerPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'multiplayer' }, [PluginMultiplayerSet])
