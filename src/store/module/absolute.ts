import { AbsoluteState } from '@/types/absolute'

export default {
  namespaced: true,
  state: () =>
    ({
      commands: false,
      load: false,
      project: {
        new: false,
      },
      modal: {
        newProject: false,
      },
      aside: true,
      shortcuts: {
        switcher: false,
        finder: false,
      },
      logger: false,
      pdf: {
        configuration: false,
        preview: false,
      },
      auth: {
        dropbox: false,
      },
    } as AbsoluteState),
  mutations: {
    commands(state: AbsoluteState) {
      state.commands = !state.commands
    },
    load(state: AbsoluteState, b: boolean) {
      state.load = b
    },
    switchProjectCreate(state: AbsoluteState, b: boolean) {
      state.project.new = b
    },
    switchProjectModal(state: AbsoluteState, b: boolean) {
      state.modal.newProject = b
    },
    switchAside(state: AbsoluteState, b: boolean) {
      state.aside = b
    },
    switchShortcutSwitcher(state: AbsoluteState, b: boolean) {
      state.shortcuts.switcher = b
    },
    switchShortcutFinder(state: AbsoluteState, b: boolean) {
      state.shortcuts.finder = b
    },
    switchLogger(state: AbsoluteState, b: boolean) {
      state.logger = b
    },
    switchPdfConfiguration(state: AbsoluteState, b: boolean) {
      state.pdf.configuration = b
    },
    switchPdfPreview(state: AbsoluteState, b: boolean) {
      state.pdf.preview = b
    },
    switchAuthDropbox(state: AbsoluteState, b: boolean) {
      state.auth.dropbox = b
    },
  },
  actions: {},
  getters: {},
}
