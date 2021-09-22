import { ContextState } from '@/types/context'

export interface ProjectState {
  name: string
  version: string
  main: Record<any, any>
  summary: Record<any, any>
  pages: Array<Array<ContextState>>
}
