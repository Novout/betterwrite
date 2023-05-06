import { PluginTypes } from 'better-write-types'
import { createPlugin } from 'better-write-plugin-core'
import { PluginDropSet } from './drop'
import { PluginHandlerSet } from './handler'
import { PluginScriptSet } from './script'
import { PluginWatcherSet } from './watcher'
import { PluginThemeSet } from './theme'
import { PluginSeoSet } from './seo'
import { PluginAutosaveSet } from './autosave'
import { PluginAPIAsyncRequest } from './api-async-request'

export const EditorWindowPlugin = (): PluginTypes.Plugin =>
  createPlugin({ name: 'editor-window' }, [
    PluginHandlerSet,
    PluginDropSet,
    PluginScriptSet,
    PluginWatcherSet,
    PluginThemeSet,
    PluginSeoSet,
    PluginAutosaveSet,
    PluginAPIAsyncRequest,
  ])
