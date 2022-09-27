import { StateTree, Store } from 'pinia'
import { App } from 'vue-demi'
import {
  AbsoluteState,
  AuthState,
  ContextState,
  EditorState,
  PDFState,
  DOCXState,
  ProjectState,
} from '../../'

export type PluginEmitterName =
  | 'plugin-input-watch-initial'
  | 'plugin-input-watch-last'
  | 'plugin-entity-create'
  | 'plugin-entity-create-empty'
  | 'plugin-entity-delete'
  | 'plugin-entity-swap'
  | 'plugin-entity-page-break'
  | 'plugin-entity-alter-in-page'
  | 'plugin-entity-paste-in-page'
  | 'plugin-theme-set'
  | 'plugin-theme-set-logo'
  | 'plugin-pdf-generate'
  | 'plugin-pdf-preview'
  | 'plugin-pdf-init'
  | 'plugin-docx-generate'
  | 'plugin-txt-generate'
  | 'plugin-html-generate'
  | 'plugin-importer-docx'
  | 'plugin-importer-txt'
  | 'plugin-importer-bw'
  | 'plugin-project-page-new'
  | 'plugin-project-page-delete'
  | 'plugin-project-page-swap'
  | 'plugin-project-creative-drafts-delete-draft'
  | 'plugin-project-creative-drafts-create-draft'
  | 'plugin-project-creative-drafts-reset-draft'
  | 'plugin-project-creative-drafts-set-draft'
  | 'plugin-project-creative-drafts-update'
  | 'plugin-auto-save'
  | 'plugin-dropbox-save'
  | 'plugin-editor-mounted'
  | 'plugin-multiplayer-create'
  | 'plugin-multiplayer-enter'
  | 'plugin-multiplayer-leave'
  | 'plugin-multiplayer-room-id'
  | 'plugin-multiplayer-room-context-update'
  | 'plugin-annotations-start'
  | 'plugin-annotations-folder-create'
  | 'plugin-annotations-folder-delete'
  | 'plugin-annotations-folder-graph-open'
  | 'plugin-annotations-file-create'
  | 'plugin-annotations-file-delete'
  | 'plugin-annotations-reset'

export interface PluginEmitter {
  on: (name: PluginEmitterName, callback: (...c: any) => any) => void
  emit: (name: PluginEmitterName, ...c: any) => void
}

export type ExistingStores =
  | 'absolute'
  | 'auth'
  | 'context'
  | 'editor'
  | 'pdf'
  | 'docx'
  | 'project'
  | 'externals'

export type PluginStore<
  T extends ExistingStores,
  B extends StateTree,
  C = {},
  D = {}
> = Store<T, B, C, D>

export interface PluginStores {
  ABSOLUTE: PluginStore<'absolute', AbsoluteState, any, any>
  AUTH: PluginStore<'auth', AuthState, any, any>
  CONTEXT: PluginStore<'context', ContextState, any, any>
  EDITOR: PluginStore<'editor', EditorState, any, any>
  PDF: PluginStore<'pdf', PDFState, any, any>
  DOCX: PluginStore<'docx', DOCXState, any, any>
  PROJECT: PluginStore<'project', ProjectState, any, any>
  EXTERNALS: PluginStore<'externals', ProjectState, any, any>
}

export interface PluginDefines {
  name: string
}

export type PluginHook = any

export interface PluginHooks {
  local: PluginHook
  storage: PluginHook
  creative: PluginHook
  defines: PluginHook
  editor: PluginHook
  entity: PluginHook
  env: PluginHook
  factory: PluginHook
  format: PluginHook
  graph: PluginHook
  input: PluginHook
  page: PluginHook
  populate: PluginHook
  project: PluginHook
  raw: PluginHook
  scroll: PluginHook
  utils: PluginHook
  i18n: PluginHook
  emitter: PluginHook
  plugin: PluginHook
  substitution: PluginHook
  toast: PluginHook
  breakpoints: PluginHook
  transformer: PluginHook
  vueuse: {
    core: PluginHook
    integration: {
      progress: PluginHook
    }
  }
}

export type PluginContext = (
  emitter: PluginEmitter,
  stores: PluginStores,
  hooks: PluginHooks
) => void

export interface Plugin {
  defines: PluginDefines
  init: PluginContext
}
export type Plugins = Plugin[]

export interface PluginCore {
  start: (plugins?: Plugins) => void
}

export interface CoreOption {}

export interface CorePlugin {
  options?: CoreOption
  start: (stores: PluginStores, plugins: Plugins, hooks: PluginHooks) => void
  install: (app: App) => void
}
