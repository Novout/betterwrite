import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { RoomSet } from './room'

export const MultiplayerPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'multiplayer' }, [RoomSet])
