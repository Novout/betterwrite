export interface ContextState {
  id: number
  entity: Array<ContextStatePageContent>
}

export interface ContextStatePageContent {
  type: string
  raw: string
  createdAt: string
  updatedAt: string
  external?: Array<any>
}
