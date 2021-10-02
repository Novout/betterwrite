import { ContextState, ContextStatePageContent } from '@/types/context'
import { useFormat } from '@/use/format'

export default {
  namespaced: true,
  state: () =>
    ({
      id: 0,
      totalEntityCreated: 0,
      entity: [],
    } as ContextState),
  mutations: {
    load(state: ContextState, content: ContextState) {
      state.id = content.id
      state.totalEntityCreated = content.totalEntityCreated
      state.entity = content.entity
    },
    addInPage(state: ContextState, content: ContextStatePageContent) {
      state.totalEntityCreated++
      
      state.entity.push(content)
    },
    addInPageWithPaste(state: ContextState, content: ContextStatePageContent) {
      // force nextTick for id append...
    },
    updateInPage(state: ContextState, obj: Record<any, any>) {
      const content = state.entity.find(
        (content: ContextStatePageContent) => content.id === obj.id
      )

      if (!content) return

      const index = state.entity.indexOf(content)

      obj.updatedAt = useFormat().actually()

      state.entity[index].raw = obj.raw
    },
    removeInPage(state: ContextState, entity: ContextStatePageContent) {
      const index = state.entity.indexOf(entity)

      if (index === -1 || !index) return

      state.entity.splice(index, 1)
    },
    switchInPage(state: ContextState, obj: Record<any, any>) {
      const index = state.entity.indexOf(obj.entity)

      if (index === -1 || !index) return

      let sIndex
      obj.direction === 'up' ? (sIndex = index - 1) : (sIndex = index + 1)

      if (
        (sIndex < 0 && obj.direction === 'up') ||
        (sIndex >= state.entity.length && obj.direction === 'down')
      )
        return

      const target = state.entity[sIndex]

      if (target.type === 'heading-one') return

      const temp = state.entity[index]
      state.entity[index] = target
      state.entity[sIndex] = temp
    },
    switchEntityRaw(state: ContextState, obj: Record<string, any>) {
      const index = state.entity.indexOf(obj.entity)

      const r = state.entity[index].raw.replaceAll(obj.match, obj.raw)

      state.entity[index].raw = r
    },
    newInPage(state: ContextState, entity: ContextStatePageContent) {
      const index = state.entity.indexOf(entity)

      state.totalEntityCreated++

      state.entity.splice(index, 0, {
        id: state.totalEntityCreated,
        type: 'paragraph',
        raw: '-',
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as ContextStatePageContent)
    },
  },
  actions: {},
  getters: {},
}
