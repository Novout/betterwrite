import { ContextState } from './context'
import { DOCXState } from './docx'
import { EditorState } from './editor'
import { LoggerState } from './logger'
import { PDFState } from './pdf'
import { ID } from './utils'

export type ProjectType = 'creative' | 'blank'
export type ProjectBase = 'chapter' | 'timeline' | 'annotations'

export interface ProjectState {
  image?: string
  name: string
  nameRaw: string
  version: string
  creator: string
  producer: string
  keywords: string
  subject: string
  base: ProjectBase
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
  annotations: ProjectStateAnnotations
}

export interface ProjectStateOptions {
  image?: string
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
  annotations?: ProjectStateAnnotations
}

export interface ProjectStateAnnotations {
  folders: ProjectStateAnnotationFolder[]
}

export interface ProjectStateAnnotationFolder {
  id: ID<string>
  folderName: string
  files: ProjectStateAnnotationFile[]
}

export interface ProjectStateAnnotationFile {
  id: ID<string>
  fileName: string
  value: any
}

export interface ProjectStateShortcuts {
  inserts: ProjectStateShortcutsInserts[]
}

export interface ProjectStateShortcutsInserts {
  key: string
  value: string
}

export interface ProjectStateTemplates {
  generators: ProjectStateTemplatesGenerator[]
  substitutions: ProjectStateTemplatesSubstitutions
}

export interface ProjectStateTemplatesGenerator {
  className: string
  font: string
  fontSize: number
  lineHeight: number
  alignment: 'left' | 'center' | 'right' | 'justify'
  indent: number
  characterSpacing: number
  color: string
  background: string
  italics: boolean
  bold: boolean
  margin: {
    top: number
    bottom: number
  }
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
