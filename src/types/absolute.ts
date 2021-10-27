export interface AbsoluteStateProject {
  new: boolean
  configuration: boolean
  preferences: boolean
}

export interface AbsoluteStateModal {
  newProject: boolean
}

export interface AbsoluteStateShortcuts {
  switcher: boolean
  finder: boolean
}

export interface AbsoluteStatePDF {
  configuration: boolean
  preview: boolean
}

export interface AbsoluteStateAuth {
  dropbox: boolean
}

export interface AbsoluteState {
  commands: boolean
  project: AbsoluteStateProject
  load: boolean
  aside: boolean
  modal: AbsoluteStateModal
  shortcuts: AbsoluteStateShortcuts
  logger: boolean
  pdf: AbsoluteStatePDF
  auth: AbsoluteStateAuth
}
