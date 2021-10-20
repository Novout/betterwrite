import { ContextStatePageContent } from './context'
export interface VueEmitterEntityClose {
  all?: boolean
}

export interface VueEmitterEntityOpen {
  entity: ContextStatePageContent
  up?: boolean
  selectionInitial?: boolean
  switch?: boolean
}

export type VueEmitterName =
  | 'entity-input-focus'
  | 'entity-open'
  | 'entity-close'
  | 'entity-focus'
  | 'entity-input-raw'
  | 'entity-open-last'
  | 'entity-not-mutate'
  | 'pdf-preview-exists'

export interface VueEmitter {
  on: (name: VueEmitterName, callback: (...c: any) => any) => void
  emit: (name: VueEmitterName, ...c: any) => void
}
