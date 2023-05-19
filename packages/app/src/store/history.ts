import type { HistoryState, HistoryStateBarItem } from 'better-write-types'
import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', {
  state: (): HistoryState => {
    return {
      stack: [],
      bar: [],
      barActive: undefined,
    }
  },
  actions: {
    addBar(item: HistoryStateBarItem) {
      const exists = this.bar.some(
        ({ id, type }) => item.id === id && type === item.type
      )

      this.barActive = item.id

      if (exists) return

      this.bar.unshift(item)

      if (this.bar.length > 12) this.bar.pop()
    },
    deleteBar(item: HistoryStateBarItem) {
      this.bar = this.bar.filter(({ id }) => item.id !== id)

      if (item.id === this.barActive) this.barActive = undefined
    },
  },
})
