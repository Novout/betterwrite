import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { RoomSet } from './room'
import { UrlKeySet } from './url'

export const MultiplayerPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'multiplayer' }, [RoomSet, UrlKeySet])
