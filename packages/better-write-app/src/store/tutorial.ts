import { defineStore } from 'pinia'

export const useTutorialStore = defineStore('tutorial', {
  state: () => {
    return {
      counter: 1,
      maxCounter: 6,
    }
  },
  actions: {
    next() {
      if (this.counter >= this.maxCounter) return

      this.counter++
    },
    prev() {
      if (this.counter <= 1) return

      this.counter--
    },
  },
})
