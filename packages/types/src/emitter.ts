import { Entity } from './context'
import { ProjectStateSchemaFolder } from './project'
import { ID } from './utils'

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

export type EventsEntityTextFocus = {
  position: 'start' | 'offset' | 'end' | 'auto'
  positionOffset?: number
  target: ID<number>
}

export type Events = {
  'entity-external-comment-save': any
  'entity-speech-recognition': any
  'entity-text-focus': EventsEntityTextFocus
  'entity-text-force-save': void
  'project-creative-drafts-set-info': any
  'project-save': any
  'pdf-preview-exists': any
  'annotations-folder-graph-open': ProjectStateSchemaFolder
  'characters-handler': any
}
