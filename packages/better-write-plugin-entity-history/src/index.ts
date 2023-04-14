import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { UndoSet } from './undo'
import { SilentLimitSet } from './silent'

export const EntityHistoryPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'entity-history' }, [UndoSet, SilentLimitSet])
