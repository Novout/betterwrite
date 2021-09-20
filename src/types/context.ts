export interface ContextState {
  page: Array<ContextStatePageContent>
}

export interface ContextStatePageContent {
  id: number
  type: string
  raw: string
}
