export interface ContextState {
  id: number
  totalEntityCreated: number
  page: Array<ContextStatePageContent>
}

export interface ContextStatePageContent {
  id: number
  type: string
  raw: string
  createdAt: string
  updatedAt: string
}
