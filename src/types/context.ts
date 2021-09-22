export interface ContextState {
  id: number
  totalEntityCreated: number
  onlyHeadingOne: boolean
  entity: Array<ContextStatePageContent>
}

export interface ContextStatePageContent {
  id: number
  type: string
  raw: string
  createdAt: string
  updatedAt: string
}
