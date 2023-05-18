import { HistoryState } from 'better-write-types'
import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', {
  state: (): HistoryState => {
    return {
      stack: [],
    }
  },
})
