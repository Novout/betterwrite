import { defineStore } from 'pinia'
import { LoggerState, LoggerContent } from 'better-write-types'
import { useFormat } from '../use/format'

export const useLoggerStore = defineStore('logger', {
  state: (): LoggerState => {
    return {
      content: [],
    }
  },
  actions: {
    add(content: LoggerContent) {
      this.content.push({
        ...content,
        createdAt: useFormat().actually(),
      })
    },
    reset() {
      this.content = []
    },
    load(all: LoggerState) {
      this.content = all.content
    },
  },
})
