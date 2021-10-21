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
    load(context: ContextState) {
      this.id = context.id
      this.entities = context.entities
    },
    addInPage(entity: Entity) {
      this.entities.push(entity)
    },
    addInPageWithPaste(content: Entity) {
      // force nextTick for id append...
    },
    updateInPage(obj: Record<string, any>) {
      const index = this.entities.indexOf(obj.entity)

      if (index === -1 || obj.raw === this.entities[index].raw) return

      if (obj.raw === '') {
        this.entities[index].raw = useEnv().emptyLine()
        this.entities[index].updatedAt = useFormat().actually()
      } else if (obj.raw !== this.entities[index].raw) {
        this.entities[index].raw = obj.raw
        this.entities[index].updatedAt = useFormat().actually()
      }
    },
    removeInPage(entity: Entity) {
      const index = this.entities.indexOf(entity)

      if (index === -1 || entity.type === 'heading-one') return

      this.entities = this.entities.filter(
        (item: Entity) => this.entities.indexOf(item) !== index
      )
    },
    switchInPage(obj: Record<any, any>) {
      const index = this.entities.indexOf(obj.entity)

      if (index === -1) return

      let sIndex
      obj.direction === 'up' ? (sIndex = index - 1) : (sIndex = index + 1)

      if (
        (sIndex < 0 && obj.direction === 'up') ||
        (sIndex >= this.entities.length && obj.direction === 'down')
      )
        return

      const target = this.entities[sIndex]

      if (obj.entity.type === 'heading-one' || target.type === 'heading-one')
        return

      const temp = this.entities[index]
      this.entities[index] = target
      this.entities[sIndex] = temp
    },
    switchEntityRaw(obj: Record<string, any>) {
      const index = this.entities.indexOf(obj.entity)

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
      const index = this.entities.indexOf(payload.entity as Entity)

      if (index === -1) return

      const entity = {
        type: payload.type as string,
        raw: useEnv().emptyLine(),
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as Entity

      this.entities = useUtils().array().insert(this.entities, index, entity)
    },
    newInPagePosEdit(payload: Record<string, Entity | string>) {
      const index = this.entities.indexOf(payload.entity as Entity)

      if (index === -1) return

      const entity = {
        type: payload.type as string,
        raw: payload.raw || useEnv().emptyLine(),
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as Entity

      this.entities = useUtils()
        .array()
        .insert(this.entities, index + 1, entity)
    },
    alterInPage(payload: Record<string, Entity | EntityType>) {
      const index = this.entities.indexOf(payload.entity as Entity)

      if (index === -1) return

      const entity = payload.entity as Entity

      this.entities[index].type = payload.type as EntityType
      this.entities[index].raw = entity.raw
      this.entities[index].createdAt = useFormat().actually()
      this.entities[index].updatedAt = useFormat().actually()
      this.entities[index].external = entity.external || {}
    },
    insertRawInExistentEntity(entity: Entity) {
      const index = this.entities.indexOf(entity)

      if (index === -1) return

      const target = this.entities[index - 1]

      if (entity.raw === useEnv().emptyLine()) return

      if (target.raw === useEnv().emptyLine()) {
        this.entities[index - 1].raw = entity.raw
      } else {
        this.entities[index - 1].raw = target.raw + entity.raw
      }
    },
  },
})
