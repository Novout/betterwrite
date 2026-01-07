import { ShortcutsState } from 'better-write-types'
import { defineStore } from 'pinia'

export const useShortcutsStore = defineStore('shortcuts', {
  state: (): ShortcutsState => {
    return {
      ctrlShiftP: true,
      ctrlShiftE: true,
      ctrlShiftH: true,
      ctrlShiftT: true,
      ctrlS: true,
      ctrlF: true,
      ctrlH: true,
      F11: true,
    }
  },
})
