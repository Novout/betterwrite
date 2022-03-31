export interface ExternalsFinder {
  value: string
  entityFocus: number
  closeFinder: boolean
}

export interface ExternalsState {
  finder: ExternalsFinder
}
