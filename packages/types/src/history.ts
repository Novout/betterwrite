import { Entity } from './context'
import { ProjectBase } from './project'
import { ID, Maybe } from './utils'

export interface HistoryStateData {
  index: ID<number>
  entity: Entity
  type: 'delete' | 'insert'
}

export interface HistoryStateTarget {
  items: HistoryStateData[]
}

export interface HistoryStateBarItem {
  id: ID
  name: string
  type: ProjectBase
  scrollHeight: number
  createdAt: string
  customIcon?: string
}

export interface HistoryState {
  stack: HistoryStateTarget[]
  bar: HistoryStateBarItem[]
  barActive: Maybe<ID<any>>
}
