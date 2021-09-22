import { ContextState, ContextStatePageContent } from '@/types/context'

export default {
  namespaced: true,
  state: () =>
    ({
      id: 0,
      totalEntityCreated: 0,
      onlyHeadingOne: false,
      page: [],
    } as ContextState),
  mutations: {
    load(state: any, content: ContextState) {
      state.id = content.id
      state.totalEntityCreated = content.totalEntityCreated
      state.onlyHeadingOne = content.onlyHeadingOne
      state.page = content.page
    },
    addInPage(state: any, content: ContextStatePageContent) {
      state.totalEntityCreated++
      state.page.push(content)
    },
    updateInPage(state: any, obj: Record<any, any>) {
      const content = state.page.find(
        (content: ContextStatePageContent) => content.id === obj.id
      )

      const index = state.page.indexOf(content)

      state.page[index].raw = obj.raw
    },
    removeInPage(state: any, id: number) {
      state.page = state.page.filter(
        (entity: ContextStatePageContent) => entity.id !== id
      )
    },
    switchInPage(state: any, obj: Record<any, any>) {
      const content = state.page.find(
        (content: ContextStatePageContent) => content.id === obj.id
      )

      if (!content) return

      const index = state.page.indexOf(content)

      let sIndex
      obj.direction === 'up' ? (sIndex = index - 1) : (sIndex = index + 1)

      if (
        (sIndex < 0 && obj.direction === 'up') ||
        (sIndex >= state.page.length && obj.direction === 'down')
      )
        return

      const temp = state.page[index]
      state.page[index] = state.page[sIndex]
      state.page[sIndex] = temp
    },
  },
  actions: {},
  getters: {},
}
