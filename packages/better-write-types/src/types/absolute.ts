export interface AbsoluteStateProject {
  new: boolean
  statistics: boolean
  configuration: boolean
  preferences: boolean
  corrector: boolean
  blocked: boolean
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
  generate: boolean
}

export interface AbsoluteStateAuth {
  dropbox: boolean
  supabase: boolean
}

export interface AbsoluteStateEntity {
  comment: boolean
  menu: boolean
  customize: boolean
}

export interface AbsoluteStatePages {
  drafts: boolean
}

export interface AbsoluteStateTools {
  speechRecognition: boolean
}

export interface AbsoluteStateGenerator {
  substitutions: boolean
}

export interface AbsoluteStateLive {
  create: boolean
  enter: boolean
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
  tools: AbsoluteStateTools
  generator: AbsoluteStateGenerator
  live: AbsoluteStateLive
}
