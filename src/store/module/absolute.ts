import { AbsoluteState } from '@/types/absolute'

export default {
  namespaced: true,
  state: () =>
    ({
      commands: false,
      load: false,
      modal: {
        newProject: false,
      },
      aside: true,
      shortcuts: {
        switcher: false,
      },
      logger: false,
    } as AbsoluteState),
  mutations: {
    commands(state: any) {
      state.commands = !state.commands
    },
    load(state: any, b: boolean) {
      state.load = b
    },
    switchProjectModal(state: any, b: boolean) {
      state.modal.newProject = b
    },
    switchAside(state: any, b: boolean) {
      state.aside = b
    },
    switchShortcutSwitcher(state: any, b: boolean) {
      state.shortcuts.switcher = b
    },
    switchLogger(state: any, b: boolean) {
      state.logger = b
    },
  },
  actions: {},
  getters: {},
}
