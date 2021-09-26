import { ShortcutsState } from '@/types/shortcuts'
import { useDefines } from '@/use/defines'

export default {
  namespaced: true,
  state: () =>
    ({
      localSaveProject: useDefines().shortcuts('localSaveProject'),
      localLoadProject: useDefines().shortcuts('localLoadProject'),
    } as ShortcutsState),
  mutations: {},
  actions: {},
  getters: {},
}
