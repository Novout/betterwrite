import { HistoryState, HistoryStateTarget } from 'better-write-types'
import { defineStore } from 'pinia'
import { useContextStore } from './context'

export const useHistoryStore = defineStore('history', {
  state: (): HistoryState => {
    return {
      array: [],
    }
  },
  actions: {
    add(set: HistoryStateTarget) {
      this.array.unshift(set)
    },
    back() {
      const CONTEXT = useContextStore()

      const target = this.array[0] as HistoryStateTarget

      target?.items.forEach((t) => {
        if (t?.type === 'delete') {
          CONTEXT.insert(t.entity, t.index)
        } else if (t?.type === 'insert') {
          CONTEXT.delete(t.entity, t.index)
        }
      })

      this.array.shift()
    },
  },
})
