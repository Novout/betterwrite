import { ContextState, ContextStatePageContent } from '@/types/context'
import { useEnv } from '@/use/env'
import { useFormat } from '@/use/format'

export default {
  namespaced: true,
  state: () =>
    ({
      id: 0,
      entity: [],
    } as ContextState),
  mutations: {
    load(state: ContextState, content: ContextState) {
      state.id = content.id
      state.entity = content.entity
    },
    addInPage(state: ContextState, content: ContextStatePageContent) {
      state.entity.push(content)
    },
    addInPageWithPaste(state: ContextState, content: ContextStatePageContent) {
      // force nextTick for id append...
    },
    updateInPage(state: ContextState, obj: Record<string, any>) {
      const index = state.entity.indexOf(obj.entity)

      if (index === -1 || obj.raw === state.entity[index].raw) return

      if (obj.raw === '') {
        state.entity[index].raw = useEnv().emptyLine()
        state.entity[index].updatedAt = useFormat().actually()
      } else if (obj.raw !== state.entity[index].raw) {
        state.entity[index].raw = obj.raw
        state.entity[index].updatedAt = useFormat().actually()
      }
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
    newInExistentEntity(
      state: ContextState,
      payload: Record<string, ContextStatePageContent>
    ) {
      const index = state.entity.indexOf(payload.old)

      if (index === -1) return

      state.entity[index].type = payload.new.type
      state.entity[index].raw = payload.new.raw
      state.entity[index].createdAt = payload.new.createdAt
      state.entity[index].updatedAt = useFormat().actually()
      state.entity[index].external = payload.new.external || {}
    },
    newInPage(
      state: ContextState,
      payload: Record<string, ContextStatePageContent | string>
    ) {
      const index = state.entity.indexOf(
        payload.entity as ContextStatePageContent
      )

      if (index === -1) return

      state.entity.splice(index, 0, {
        type: payload.type as string,
        raw: useEnv().emptyLine(),
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as ContextStatePageContent)
    },
    newInPagePosEdit(
      state: ContextState,
      payload: Record<string, ContextStatePageContent | string>
    ) {
      const index = state.entity.indexOf(
        payload.entity as ContextStatePageContent
      )

      if (index === -1) return

      state.entity.splice(index + 1, 0, {
        type: payload.type as string,
        raw: payload.raw || useEnv().emptyLine(),
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as ContextStatePageContent)
    },
    alterInPage(
      state: ContextState,
      payload: Record<string, ContextStatePageContent | string>
    ) {
      const index = state.entity.indexOf(
        payload.entity as ContextStatePageContent
      )

      if (index === -1) return

      state.entity.splice(index, 1, {
        type: payload.type as string,
        raw: (payload.entity as ContextStatePageContent).raw,
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as ContextStatePageContent)
    },
    insertRawInExistentEntity(
      state: ContextState,
      entity: ContextStatePageContent
    ) {
      const index = state.entity.indexOf(entity)

      if (index === -1) return

      const target = state.entity[index - 1]

      if (target.raw === useEnv().emptyLine()) {
        state.entity[index - 1].raw = entity.raw
      } else {
        state.entity[index - 1].raw = target.raw + entity.raw
      }
    },
  },
  actions: {},
  getters: {},
}
