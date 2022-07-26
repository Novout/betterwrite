import { ContextState, EntityExternalParagraphGenerator } from './context'
import { DOCXState } from './docx'
import { EditorState } from './editor'
import { LoggerState } from './logger'
import { PDFState } from './pdf'
import { ID } from './utils'

export type ProjectType = 'creative' | 'blank'

export interface ProjectState {
  name: string
  nameRaw: string
  version: string
  creator: string
  producer: string
  keywords: string
  subject: string
  base: 'chapter' | 'timeline'
  type: ProjectType
  totalPagesCreated: number
  main: Record<any, any>
  summary: Record<any, any>
  pages: Array<ContextState>
  pageLoaded: number
  scrollLoaded: number
  offsetLoaded: number
  bw: ProjectStateBetterWrite
  pdf: ProjectStatePDF
  creative: ProjectStateCreative
  templates: ProjectStateTemplates
  shortcuts: ProjectStateShortcuts
}

export interface ProjectStateOptions {
  name?: string
  nameRaw?: string
  version?: string
  creator?: string
  producer?: string
  keywords?: string
  subject?: string
  base?: 'chapter' | 'timeline'
  type: ProjectType
  totalPagesCreated?: number
  main?: Record<any, any>
  summary?: Record<any, any>
  pages?: Array<ContextState>
  pageLoaded?: number
  scrollLoaded?: number
  offsetLoaded?: number
  bw?: ProjectStateBetterWrite
  pdf?: ProjectStatePDF
  creative?: ProjectStateCreative
  templates?: ProjectStateTemplates
  shortcuts?: ProjectStateShortcuts
}

export interface ProjectStateShortcuts {
  inserts: ProjectStateShortcutsInserts[]
}

export interface ProjectStateShortcutsInserts {
  key: string
  value: string
}

export interface ProjectStateTemplates {
  generator: ProjectStateTemplatesGenerator[]
  substitutions: ProjectStateTemplatesSubstitutions
}

export interface ProjectStateTemplatesSubstitutions {
  text: ProjectStateTemplatesSubstitutionsText[]
  italic: ProjectStateTemplatesSubstitutionsItalic[]
  bold: ProjectStateTemplatesSubstitutionsBold[]
}

export interface ProjectStateTemplatesSubstitutionsItalic {
  active: boolean
  data: string
}

export interface ProjectStateTemplatesSubstitutionsBold {
  active: boolean
  data: string
}

export interface ProjectStateTemplatesSubstitutionsText {
  active: boolean
  old: string
  new: string
}

export interface ProjectStateTemplatesGenerator {
  name: string
  paragraph: EntityExternalParagraphGenerator
}

export interface ProjectStateCreative {
  drafts: Array<ContextState>
}

export interface ProjectStatePDF {
  encryption: ProjectStatePDFEncryption
  permissions: ProjectStatePDFPermissions
}

export interface ProjectStatePDFEncryption {
  userPassword: string
  ownerPassword: string
}

export interface ProjectStatePDFPermissions {
  printing: 'highResolution' | 'lowResolution'
  modifying: boolean
  copying: boolean
  annotating: boolean
  fillingForms: boolean
  contentAccessibility: boolean
  documentAssembly: boolean
}

export interface ProjectObject {
  id?: ID<number>
  project: ProjectState
  editor: EditorState
  logger: LoggerState
  pdf: PDFState
  docx: DOCXState
}

export interface ProjectStateBetterWrite {
  platform: 'web' | 'desktop' | 'app'
  version: string
}

export interface ProjectTypeID {
  draft: ID<number>
  active: ID<number>
}
