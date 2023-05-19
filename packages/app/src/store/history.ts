import type { HistoryState, HistoryStateBarItem } from 'better-write-types'
import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', {
  state: (): HistoryState => {
    return {
      stack: [],
      bar: [],
    }
  },
  actions: {
    addBar(item: HistoryStateBarItem) {
      const exists = this.bar.some(
        ({ id, type }) => item.id === id && type === item.type
      )

      if (exists) return

      this.bar.unshift(item)
    },
    deleteBar(item: HistoryStateBarItem) {
      this.bar = this.bar.filter(({ id }) => item.id !== id)
    },
  },
})
