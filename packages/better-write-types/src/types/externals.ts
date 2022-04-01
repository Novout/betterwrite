export interface ExternalsFinder {
  value: string
  entity: number
  close: boolean
}

export interface ExternalsSwitcher {
  value: string
  replace: string
  entity: number
  close: boolean
}

export interface ExternalsState {
  finder: ExternalsFinder
  switcher: ExternalsSwitcher
}
