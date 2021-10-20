import { defineStore } from 'pinia'
import { LoggerState } from '@/types/logger'
import { LoggerContent } from '../types/logger'

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
    load(arr: Array<LoggerContent>) {
      this.content = arr
    },
  },
})
