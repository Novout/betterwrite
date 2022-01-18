import { ContextState } from './context'
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
  type: string
  totalPagesCreated: number
  main: Record<any, any>
  summary: Record<any, any>
  pages: Array<ContextState>
  pageLoaded: number
  bw: ProjectStateBetterWrite
  pdf: ProjectStatePDF
  creative: ProjectStateCreative
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
}

export interface ProjectStateBetterWrite {
  platform: 'web' | 'desktop' | 'app'
  version: string
}

export interface ProjectTypeID {
  draft: ID<number>
  active: ID<number>
}
