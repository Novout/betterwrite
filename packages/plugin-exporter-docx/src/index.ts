import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginDocxSet } from './set'

export const DocxPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'docx' }, [PluginDocxSet])
