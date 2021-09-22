import { ContextState, ContextStatePageContent } from '@/types/context'

export default {
  namespaced: true,
  state: () =>
    ({
      id: 0,
      totalEntityCreated: 0,
      onlyHeadingOne: false,
      entity: [],
    } as ContextState),
  mutations: {
    load(state: any, content: ContextState) {
      state.id = content.id
      state.totalEntityCreated = content.totalEntityCreated
      state.onlyHeadingOne = content.onlyHeadingOne
      state.entity = content.entity
    },
    addInPage(state: any, content: ContextStatePageContent) {
      state.totalEntityCreated++
      state.entity.push(content)
    },
    updateInPage(state: any, obj: Record<any, any>) {
      const content = state.entity.find(
        (content: ContextStatePageContent) => content.id === obj.id
      )

      const index = state.entity.indexOf(content)

      state.entity[index].raw = obj.raw
    },
    removeInPage(state: any, id: number) {
      state.entity = state.entity.filter(
        (entity: ContextStatePageContent) => entity.id !== id
      )
    },
    switchInPage(state: any, obj: Record<any, any>) {
      const content = state.entity.find(
        (content: ContextStatePageContent) => content.id === obj.id
      )

      if (!content) return

      const index = state.entity.indexOf(content)

      let sIndex
      obj.direction === 'up' ? (sIndex = index - 1) : (sIndex = index + 1)

      if (
        (sIndex < 0 && obj.direction === 'up') ||
        (sIndex >= state.entity.length && obj.direction === 'down')
      )
        return

      const temp = state.entity[index]
      state.entity[index] = state.entity[sIndex]
      state.entity[sIndex] = temp
    },
  },
  actions: {},
  getters: {},
}
