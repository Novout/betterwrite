import { defineStore } from 'pinia'
import { LoggerState, LoggerContent } from 'better-write-types'

export const useLoggerStore = defineStore('logger', {
  state: (): LoggerState => {
    return {
      content: [],
    }
  },
  actions: {
    add(content: LoggerContent) {
      this.content.push(content)
    },
    reset() {
      this.content = []
    },
    load(all: LoggerState) {
      this.content = all.content
    },
  },
})
