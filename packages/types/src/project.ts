import { ContextState } from './context'
import { DOCXState } from './docx'
import { EditorState } from './editor'
import { PDFState } from './pdf'
import { ID } from './utils'

export type ProjectType = 'creative' | 'blank' | 'only-annotations'
export type ProjectBase = 'chapter' | 'annotations'

export interface ProjectState {
  image?: string
  name: string
  nameRaw: string
  version: string
  creator: string
  producer: string
  keywords: string
  subject: string
  externalProvider?: 'dropbox' | 'google-drive'
  base: ProjectBase
  type: ProjectType
  totalPagesCreated: number
  main: Record<any, any>
  summary: Record<any, any>
  chapters: Array<ContextState>
  pageLoaded: ID<string>
  scrollLoaded: number
  offsetLoaded: number
  bw: ProjectStateBetterWrite
  pdf: ProjectStatePDF
  creative: ProjectStateCreative
  templates: ProjectStateTemplates
  shortcuts: ProjectStateShortcuts
  schemas: ProjectStateSchema[]
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
  externalProvider?: 'dropbox' | 'google-drive'
  base?: ProjectBase
  type: ProjectType
  totalPagesCreated?: number
  main?: Record<any, any>
  summary?: Record<any, any>
  chapters?: Array<ContextState>
  pageLoaded?: ID<string>
  scrollLoaded?: number
  offsetLoaded?: number
  bw?: ProjectStateBetterWrite
  pdf?: ProjectStatePDF
  creative?: ProjectStateCreative
  templates?: ProjectStateTemplates
  shortcuts?: ProjectStateShortcuts
  schemas?: ProjectStateSchema[]
}

export type ProjectStateCharacterNameCase = 'strict' | 'default' | 'all'

export type ProjectStateSchemaType = 'characters' | 'default'

export type ProjectStateSchema =
  | ProjectStateSchemaDefault
  | ProjectStateSchemaCharacter

export interface ProjectStateSchemaFolder<T extends object = any> {
  id: ID<string>
  parentId: ID<string>
  folderName: string
  files: ProjectStateSchemaFile<T>[]
  customIcon?: string
}

export interface ProjectStateSchemaFile<T extends object = any> {
  id: ID<string>
  parentId: ID<string>
  fileName: string
  milkdownData: any
  extra: T
  customIcon?: string
}

export interface ProjectStateSchemaSet {
  id: ID<string>
  type: ProjectStateSchemaType
  name: string
  prefix: string
  customIcon?: string
}

export interface ProjectStateSchemaDefault extends ProjectStateSchemaSet {
  folders: ProjectStateSchemaFolder<any>[]
}

export interface ProjectStateSchemaCharacter extends ProjectStateSchemaSet {
  folders: ProjectStateSchemaFolder<ProjectStateSchemaCharacterItem>[]
}

export interface ProjectStateSchemaCharacterItem {
  id: ID<string>
  name: string
  nameCase: ProjectStateCharacterNameCase | string
  color: string
  colorAlpha?: number
  important: boolean
  configuration: boolean
  disabled: boolean
}

export interface ProjectStateSchemaCreate {
  name: string
  type: ProjectStateSchemaType
  prefix: string
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

export interface ProjectDocument {
  document: {
    id: ID<number>
    name: string
    type: ProjectType
  }
}
