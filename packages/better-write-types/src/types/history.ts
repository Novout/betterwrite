import { Entity } from './context'
import { ID } from './utils'

export interface HistoryStateData {
  index: ID<number>
  entity: Entity
  type: 'delete' | 'insert'
}

export interface HistoryStateTarget {
  items: HistoryStateData[]
}

export interface HistoryState {
  array: HistoryStateTarget[]
}
