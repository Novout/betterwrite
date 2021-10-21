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
  entity: Array<Entity>
}

export type Entity = {
  type: EntityType
  raw: string
  createdAt: string
  updatedAt: string
  external?: Record<any, any>
}
