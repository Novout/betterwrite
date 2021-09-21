import { ContextState } from '@/types/context'

export interface ProjectState {
  name: string
  version: string
  pages: Array<Array<ContextState>>
}
