export type EntityType =
  | 'paragraph'
  | 'heading-one'
  | 'heading-two'
  | 'heading-three'
  | 'page-break'
  | 'line-break'
  | 'image'

export interface ContextState {
  id: number
  entity: Array<ContextStatePageContent>
}

export interface ContextStatePageContent {
  type: EntityType
  raw: string
  createdAt: string
  updatedAt: string
  external?: Record<any, any>
}
