import { ContextState, ContextStatePageContent } from '@/types/context'
import { objectToString } from '@vue/shared'

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
