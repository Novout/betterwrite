export interface ContextActionsUpdateInPage {
  entity: Entity
  raw: string
}

export interface ContextActionSwitchInPage {
  entity: Entity
  direction: 'up' | 'down'
}

export interface ContextActionSwitchEntityRaw {
  entity: Entity
  match: string
  raw: string
}

export interface ContextActionNewInExistentEntity {
  old: Entity
  new: Entity
}

export interface ContextActionNewInPage {
  entity: Entity
  type: string
}

export interface ContextActionNewInPagePosEdit {
  entity: Entity
  type: EntityType
  raw?: string
}

export interface ContextActionAlterInPage {
  entity: Entity
  type: EntityType
}

export type EntityType =
  | 'paragraph'
  | 'heading-one'
  | 'heading-two'
  | 'heading-three'
  | 'page-break'
  | 'line-break'
  | 'image'
  | 'checkbox'
  | 'list'
  | 'drau'

export type ContextState = {
  id: number
  title: string
  entities: Array<Entity>
  createdAt: string
  updatedAt: string
}

export interface EntityShowEditOptions {
  keyboard?: boolean
  switch?: boolean
  selectionInitial?: boolean
  cursor?: boolean
}

export interface EntityExternalComment {
  raw: string
  updatedAt: string
  createdAt: string
}

export interface EntityExternalCheckbox {
  select: boolean
}

export interface EntityExternalList {
  type: 'number' | 'rounded'
}

export interface EntityExternalParagraphGenerator {
  font: string
  fontSize: number
  lineHeight: number
  alignment: 'left' | 'center' | 'right' | 'justify'
  indent: number
  characterSpacing: number
  color: string
  background: string
  italics: boolean
  bold: boolean
  margin: {
    top: number
    bottom: number
  }
}

export interface EntityExternalParagraph {
  active: boolean
  generator: EntityExternalParagraphGenerator
}

export interface EntityExternal {
  paragraph?: EntityExternalParagraph
  image?: EntityExternalImage
  comment?: EntityExternalComment
  checkbox?: EntityExternalCheckbox
  list?: EntityExternalList
}

export interface EntityExternalImageSize {
  width: number
  height: number
}

export interface EntityExternalImage {
  name: string
  size: EntityExternalImageSize
  alignment: 'left' | 'center' | 'right' | 'full' | 'auto'
}

export interface EntityVisual {
  info: boolean
  error: boolean
  warning: boolean
}

export type Entity = {
  type: EntityType
  raw: string
  createdAt: string
  updatedAt: string
  visual: EntityVisual
  external?: EntityExternal
}

export type Entities = Array<Entity>
