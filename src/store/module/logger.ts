import { LoggerContent, LoggerState } from '@/types/logger'

export default {
  namespaced: true,
  state: () =>
    ({
      content: [],
    } as LoggerState),
  mutations: {
    add(state: any, content: LoggerContent) {
      state.content.push(content)
    },
    reset(state: any) {
      state.content = []
    },
    load(state: any, arr: Array<LoggerContent>) {
      state.content = arr
    },
  },
  actions: {},
  getters: {},
}
