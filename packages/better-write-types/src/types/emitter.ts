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
  keyboard?: boolean
}

export type VueEmitterName =
  | 'entity-reset'
  | 'entity-input-focus'
  | 'entity-open'
  | 'entity-open-by-index'
  | 'entity-scroll-by-index'
  | 'entity-close'
  | 'entity-focus'
  | 'entity-input-raw'
  | 'entity-open-last'
  | 'entity-not-mutate'
  | 'entity-force-close'
  | 'entity-not-mutate-down'
  | 'entity-edit-save'
  | 'entity-hover'
  | 'entity-external-comment-save'
  | 'entity-speech-recognition'
  | 'controller-entity-next'
  | 'controller-entity-back'
  | 'project-creative-drafts-set-info'
  | 'project-save'
  | 'pdf-preview-exists'

export interface VueEmitter {
  on: (name: VueEmitterName, callback: (...c: any) => any) => void
  emit: (name: VueEmitterName, ...c: any) => void
}
