import { Entity } from './context'
export interface VueEmitterEntityClose {
  all?: boolean
}

export interface VueEmitterEntityOpen {
  entity: Entity
  up?: boolean
  selectionInitial?: boolean
  switch?: boolean
  cursor?: boolean
}

export type VueEmitterName =
  | 'entity-input-focus'
  | 'entity-input-force-enter'
  | 'entity-open'
  | 'entity-open-by-index'
  | 'entity-scroll-by-index'
  | 'entity-close'
  | 'entity-focus'
  | 'entity-input-raw'
  | 'entity-open-last'
  | 'entity-not-mutate'
  | 'entity-force-close'
  | 'entity-update-area'
  | 'entity-not-mutate-down'
  | 'entity-edit-reset'
  | 'entity-edit-save'
  | 'entity-edit-open'
  | 'entity-hover'
  | 'entity-external-comment-save'
  | 'project-save'
  | 'pdf-preview-exists'

export interface VueEmitter {
  on: (name: VueEmitterName, callback: (...c: any) => any) => void
  emit: (name: VueEmitterName, ...c: any) => void
}
