import type { StateTree, Store } from 'pinia'
import { App } from 'vue-demi'
import {
  AbsoluteState,
  AuthState,
  ContextState,
  EditorState,
  PDFState,
  DOCXState,
  ProjectState,
  HistoryState,
  ExternalsState,
  LiveshareState,
  GlobalState,
  VaultState,
} from '..'

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
  | 'plugin-entity-undo'
  | 'plugin-theme-set'
  | 'plugin-theme-set-logo'
  | 'plugin-pdf-generate'
  | 'plugin-pdf-preview'
  | 'plugin-pdf-init'
  | 'plugin-docx-generate'
  | 'plugin-epub-generate'
  | 'plugin-txt-generate'
  | 'plugin-html-generate'
  | 'plugin-importer-docx'
  | 'plugin-importer-txt'
  | 'plugin-importer-bw'
  | 'plugin-project-page-new'
  | 'plugin-project-page-delete'
  | 'plugin-project-page-swap'
  | 'plugin-auto-save'
  | 'plugin-editor-mounted'
  | 'plugin-schemas-get-instance'
  | 'plugin-schemas-start'
  | 'plugin-schemas-create'
  | 'plugin-schemas-delete'
  | 'plugin-schemas-folder-create'
  | 'plugin-schemas-folder-delete'
  | 'plugin-schemas-folder-graph-open'
  | 'plugin-schemas-file-create'
  | 'plugin-schemas-file-delete'
  | 'plugin-schemas-reset'
  | 'plugin-voice-start'
  | 'plugin-voice-stop'
  | 'plugin-voice-mutate'
  | 'plugin-voice-is-listening'
  | 'plugin-editor-header-project-open'
  | 'plugin-editor-header-create-open'
  | 'plugin-editor-header-help-open'
  | 'plugin-editor-header-externals-open'
  | 'plugin-editor-mounted'
  | 'plugin-editor-unmounted'
  | 'plugin-characters-color-background'
  | 'plugin-progress-start'
  | 'plugin-progress-change'
  | 'plugin-progress-end'
  | 'plugin-window-drop'
  | 'plugin-presence-room-create'
  | 'plugin-presence-room-create-key'
  | 'plugin-presence-room-join'
  | 'plugin-presence-room-leave'
  | 'plugin-oauth-register'
  | 'plugin-oauth-register-success'
  | 'plugin-oauth-register-error'
  | 'plugin-oauth-register-wizard-reset'
  | 'plugin-oauth-login'
  | 'plugin-oauth-login-with-provider'
  | 'plugin-oauth-logout'
  | 'plugin-oauth-delete'
  | 'plugin-webgl-set-camera'
  | 'plugin-webgl-loaded'
  | 'plugin-dropbox-connect'
  | 'plugin-dropbox-set'
  | 'plugin-dropbox-save'
  | 'plugin-dropbox-load'
  | 'plugin-dropbox-delete'
  | 'call-landing-created'
  | 'call-landing-mounted'
  | 'call-landing-unmounted'
  | 'call-editor-created'
  | 'call-editor-mounted'
  | 'call-editor-unmounted'
  | 'call-editor-entity-updated'
  | 'call-editor-entity-text-saved'

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
  | 'history'
  | 'liveshare'
  | 'global'
  | 'vault'

export type PluginStore<
  T extends ExistingStores,
  B extends StateTree,
  C = {},
  D = {},
> = Store<T, B, C, D>

export interface PluginStores {
  ABSOLUTE: PluginStore<'absolute', AbsoluteState, any, any>
  AUTH: PluginStore<'auth', AuthState, any, any>
  CONTEXT: PluginStore<'context', ContextState, any, any>
  EDITOR: PluginStore<'editor', EditorState, any, any>
  PDF: PluginStore<'pdf', PDFState, any, any>
  DOCX: PluginStore<'docx', DOCXState, any, any>
  PROJECT: PluginStore<'project', ProjectState, any, any>
  EXTERNALS: PluginStore<'externals', ExternalsState, any, any>
  HISTORY: PluginStore<'history', HistoryState, any, any>
  LIVESHARE: PluginStore<'liveshare', LiveshareState, any, any>
  GLOBAL: PluginStore<'global', GlobalState, any, any>
  VAULT: PluginStore<'vault', VaultState, any, any>
}

export interface PluginDefines {
  name: string
}

// TODO: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
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
  characters: PluginHook
  router: PluginHook
  vuerouter: PluginHook
  dropbox: PluginHook
  history: PluginHook
  schemas: PluginHook
  vueuse: {
    core: PluginHook
    head: PluginHook
    sound: PluginHook
    integration: {
      progress: PluginHook
    }
  }
}

export type PluginContext = (
  emitter: PluginEmitter,
  stores: PluginStores,
  hooks: PluginHooks,
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
