import { ContextState, ContextStatePageContent } from '@/types/context'

export default {
  namespaced: true,
  state: () =>
    ({
      totalEntityCreated: 0,
      page: [],
    } as ContextState),
  mutations: {
    addInPage(state: any, content: ContextStatePageContent) {
      state.totalEntityCreated++
      state.page.push(content)
    },
    removeInPage(state: any, id: number) {
      state.page = state.page.filter(
        (entity: ContextStatePageContent) => entity.id !== id
      )
    },
  },
  actions: {},
  getters: {},
}
