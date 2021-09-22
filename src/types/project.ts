import { ContextState } from '@/types/context'

export interface ProjectState {
  name: string
  version: string
  totalPagesCreated: number
  main: Record<any, any>
  summary: Record<any, any>
  pages: Array<ContextState>
  pageLoaded: number
}
