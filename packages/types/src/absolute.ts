export interface AbsoluteStateProject {
  new: boolean
  statistics: boolean
  configuration: boolean
  insertions: boolean
  characters: boolean
  preferences: boolean
  corrector: boolean
  tutorial: boolean
}

export interface AbsoluteStateModal {
  newProject: boolean
  presence: {
    createOrJoin: boolean
    info: boolean
  }
}

export interface AbsoluteStateShortcuts {
  switcher: boolean
  finder: boolean
}

export interface AbsoluteStatePDF {
  configuration: boolean
  generate: boolean
  bionicReading: boolean
}

export interface AbsoluteStateDOCX {
  configuration: boolean
  bionicReading: boolean
}

export interface AbsoluteStateEPUB {
  bionicReading: boolean
}

export interface AbsoluteStateAuth {
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

export interface AbsoluteStateSchemas {
  create: boolean
  template: boolean
}

export interface AbsoluteStateBW {
  encryptOnExport: boolean
}

export interface AbsoluteState {
  cmd: boolean
  commands: boolean
  project: AbsoluteStateProject
  load: boolean
  aside: boolean
  modal: AbsoluteStateModal
  shortcuts: AbsoluteStateShortcuts
  pdf: AbsoluteStatePDF
  epub: AbsoluteStateEPUB
  docx: AbsoluteStateDOCX
  auth: AbsoluteStateAuth
  entity: AbsoluteStateEntity
  pages: AbsoluteStatePages
  tools: AbsoluteStateTools
  generator: AbsoluteStateGenerator
  spinner: boolean
  schemas: AbsoluteStateSchemas
  bw: AbsoluteStateBW
}
