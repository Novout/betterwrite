export interface ContextState {
  id: number
  entity: Array<ContextStatePageContent>
}

export interface ContextStatePageContent {
  type:
    | 'paragraph'
    | 'heading-one'
    | 'heading-two'
    | 'heading-three'
    | 'page-break'
    | 'line-break'
    | 'image'
  raw: string
  createdAt: string
  updatedAt: string
  external?: Array<any>
}
