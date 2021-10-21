import { defineStore } from 'pinia'
import { ContextState, Entity, EntityType } from '../types/context'
import { useEnv } from '../use/env'
import { useFormat } from '../use/format'
import { useUtils } from '../use/utils'

export const useContextStore = defineStore('context', {
  state: (): ContextState => {
    return {
      id: 0,
      entities: [],
    }
  },
  actions: {
    load(content: ContextState) {
      this.id = content.id
      this.entities = content.entities
    },
    addInPage(content: Entity) {
      this.entities.push(content)
    },
    addInPageWithPaste(content: Entity) {
      // force nextTick for id append...
    },
    updateInPage(obj: Record<string, any>) {
      const index = this.entities.indexOf(obj.entities)

      if (index === -1 || obj.raw === this.entities[index].raw) return

      if (obj.raw === '') {
        this.entities[index].raw = useEnv().emptyLine()
        this.entities[index].updatedAt = useFormat().actually()
      } else if (obj.raw !== this.entities[index].raw) {
        this.entities[index].raw = obj.raw
        this.entities[index].updatedAt = useFormat().actually()
      }
    },
    removeInPage(entities: Entity) {
      const index = this.entities.indexOf(entities)

      if (index === -1 || entities.type === 'heading-one') return

      this.entities = this.entities.filter(
        (item: Entity) => this.entities.indexOf(item) !== index
      )
    },
    switchInPage(obj: Record<any, any>) {
      const index = this.entities.indexOf(obj.entities)

      if (index === -1) return

      let sIndex
      obj.direction === 'up' ? (sIndex = index - 1) : (sIndex = index + 1)

      if (
        (sIndex < 0 && obj.direction === 'up') ||
        (sIndex >= this.entities.length && obj.direction === 'down')
      )
        return

      const target = this.entities[sIndex]

      if (obj.entities.type === 'heading-one' || target.type === 'heading-one')
        return

      const temp = this.entities[index]
      this.entities[index] = target
      this.entities[sIndex] = temp
    },
    switchEntityRaw(obj: Record<string, any>) {
      const index = this.entities.indexOf(obj.entities)

      const r = this.entities[index].raw.replaceAll(obj.match, obj.raw)

      this.entities[index].raw = r
    },
    newInExistentEntity(this: ContextState, payload: Record<string, Entity>) {
      const index = this.entities.indexOf(payload.old)

      if (index === -1) return

      this.entities[index].type = payload.new.type
      this.entities[index].raw = payload.new.raw
      this.entities[index].createdAt = payload.new.createdAt
      this.entities[index].updatedAt = useFormat().actually()
      this.entities[index].external = payload.new.external || {}
    },
    newInPage(payload: Record<string, Entity | string>) {
      const index = this.entities.indexOf(payload.entities as Entity)

      if (index === -1) return

      const entities = {
        type: payload.type as string,
        raw: useEnv().emptyLine(),
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as Entity

      this.entities = useUtils().array().insert(this.entities, index, entities)
    },
    newInPagePosEdit(payload: Record<string, Entity | string>) {
      const index = this.entities.indexOf(payload.entities as Entity)

      if (index === -1) return

      const entities = {
        type: payload.type as string,
        raw: payload.raw || useEnv().emptyLine(),
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as Entity

      this.entities = useUtils()
        .array()
        .insert(this.entities, index + 1, entities)
    },
    alterInPage(payload: Record<string, Entity | EntityType>) {
      const index = this.entities.indexOf(payload.entities as Entity)

      if (index === -1) return

      const entities = payload.entities as Entity

      this.entities[index].type = payload.type as EntityType
      this.entities[index].raw = entities.raw
      this.entities[index].createdAt = useFormat().actually()
      this.entities[index].updatedAt = useFormat().actually()
      this.entities[index].external = entities.external || {}
    },
    insertRawInExistentEntity(entities: Entity) {
      const index = this.entities.indexOf(entities)

      if (index === -1) return

      const target = this.entities[index - 1]

      if (entities.raw === useEnv().emptyLine()) return

      if (target.raw === useEnv().emptyLine()) {
        this.entities[index - 1].raw = entities.raw
      } else {
        this.entities[index - 1].raw = target.raw + entities.raw
      }
    },
  },
})
