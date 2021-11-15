import { ContextState } from '@/types/context'
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
}

export interface ProjectObject {
  project: ProjectState
  editor: EditorState
  logger: LoggerState
  pdf: PDFState
}

export interface ProjectStateBetterWrite {
  platform: 'web' | 'desktop' | 'app'
  version: string
}
