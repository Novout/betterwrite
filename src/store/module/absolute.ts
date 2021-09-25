import { AbsoluteState } from '@/types/absolute'

export default {
  namespaced: true,
  state: () =>
    ({
      commands: false,
      load: false,
    } as AbsoluteState),
  mutations: {
    commands(state: any) {
      state.commands = !state.commands
    },
    load(state: any, b: boolean) {
      state.load = b
    },
  },
  actions: {},
  getters: {},
}
