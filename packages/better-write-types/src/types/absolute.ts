export interface AbsoluteStateProject {
  new: boolean
  statistics: boolean
  configuration: boolean
  preferences: boolean
  corrector: boolean
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
  supabase: boolean
  customize: boolean
}

export interface AbsoluteStateEntity {
  comment: boolean
  menu: boolean
}

export interface AbsoluteStatePages {
  drafts: boolean
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
  entity: AbsoluteStateEntity
  pages: AbsoluteStatePages
}
