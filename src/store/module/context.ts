import { ContextState, ContextStatePageContent } from '@/types/context'

export default {
  namespaced: true,
  state: () =>
    ({
      entity: 0,
      page: [],
    } as ContextState),
  mutations: {
    addInPage(state: any, content: ContextStatePageContent) {
      state.entity++
      state.page.push(content)
    },
  },
  actions: {},
  getters: {},
}
