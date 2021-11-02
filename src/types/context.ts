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

export type ContextState = {
  id: number
  entities: Array<Entity>
}

export interface EntityShowEditOptions {
  keyboard?: boolean
  switch?: boolean
  selectionInitial?: boolean
}

export interface EntityExternal {
  image?: EntityExternalImage
}

export interface EntityExternalImageSize {
  width: number
  height: number
}

export interface EntityExternalImage {
  name: string
  size: EntityExternalImageSize
  alignment: 'left' | 'center' | 'right' | 'full'
}

export type Entity = {
  type: EntityType
  raw: string
  createdAt: string
  updatedAt: string
  external?: EntityExternal
}

export type Entities = Array<Entity>
