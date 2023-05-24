import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { DropboxSet } from './set'
import { DropboxToken } from './token'

export const DropboxPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'dropbox' }, [DropboxSet, DropboxToken])
