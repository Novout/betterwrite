import { defineStore } from 'pinia'
import {
  ContextState,
  ContextStatePageContent,
  EntityType,
} from '../types/context'
import { useEnv } from '../use/env'
import { useFormat } from '../use/format'
import { useUtils } from '../use/utils'

export const useContextStore = defineStore('context', {
  state: (): ContextState => {
    return {
      id: 0,
      entity: [],
    }
  },
  actions: {
    load(content: ContextState) {
      this.id = content.id
      this.entity = content.entity
    },
    addInPage(content: ContextStatePageContent) {
      this.entity.push(content)
    },
    addInPageWithPaste(content: ContextStatePageContent) {
      // force nextTick for id append...
    },
    updateInPage(obj: Record<string, any>) {
      const index = this.entity.indexOf(obj.entity)

      if (index === -1 || obj.raw === this.entity[index].raw) return

      if (obj.raw === '') {
        this.entity[index].raw = useEnv().emptyLine()
        this.entity[index].updatedAt = useFormat().actually()
      } else if (obj.raw !== this.entity[index].raw) {
        this.entity[index].raw = obj.raw
        this.entity[index].updatedAt = useFormat().actually()
      }
    },
    removeInPage(entity: ContextStatePageContent) {
      const index = this.entity.indexOf(entity)

      if (index === -1 || entity.type === 'heading-one') return

      this.entity = this.entity.filter(
        (item: ContextStatePageContent) => this.entity.indexOf(item) !== index
      )
    },
    switchInPage(obj: Record<any, any>) {
      const index = this.entity.indexOf(obj.entity)

      if (index === -1) return

      let sIndex
      obj.direction === 'up' ? (sIndex = index - 1) : (sIndex = index + 1)

      if (
        (sIndex < 0 && obj.direction === 'up') ||
        (sIndex >= this.entity.length && obj.direction === 'down')
      )
        return

      const target = this.entity[sIndex]

      if (obj.entity.type === 'heading-one' || target.type === 'heading-one')
        return

      const temp = this.entity[index]
      this.entity[index] = target
      this.entity[sIndex] = temp
    },
    switchEntityRaw(obj: Record<string, any>) {
      const index = this.entity.indexOf(obj.entity)

      const r = this.entity[index].raw.replaceAll(obj.match, obj.raw)

      this.entity[index].raw = r
    },
    newInExistentEntity(
      this: ContextState,
      payload: Record<string, ContextStatePageContent>
    ) {
      const index = this.entity.indexOf(payload.old)

      if (index === -1) return

      this.entity[index].type = payload.new.type
      this.entity[index].raw = payload.new.raw
      this.entity[index].createdAt = payload.new.createdAt
      this.entity[index].updatedAt = useFormat().actually()
      this.entity[index].external = payload.new.external || {}
    },
    newInPage(payload: Record<string, ContextStatePageContent | string>) {
      const index = this.entity.indexOf(
        payload.entity as ContextStatePageContent
      )

      if (index === -1) return

      const entity = {
        type: payload.type as string,
        raw: useEnv().emptyLine(),
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as ContextStatePageContent

      this.entity = useUtils().array().insert(this.entity, index, entity)
    },
    newInPagePosEdit(
      payload: Record<string, ContextStatePageContent | string>
    ) {
      const index = this.entity.indexOf(
        payload.entity as ContextStatePageContent
      )

      if (index === -1) return

      const entity = {
        type: payload.type as string,
        raw: payload.raw || useEnv().emptyLine(),
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as ContextStatePageContent

      this.entity = useUtils()
        .array()
        .insert(this.entity, index + 1, entity)
    },
    alterInPage(payload: Record<string, ContextStatePageContent | EntityType>) {
      const index = this.entity.indexOf(
        payload.entity as ContextStatePageContent
      )

      if (index === -1) return

      const entity = payload.entity as ContextStatePageContent

      this.entity[index].type = payload.type as EntityType
      this.entity[index].raw = entity.raw
      this.entity[index].createdAt = useFormat().actually()
      this.entity[index].updatedAt = useFormat().actually()
      this.entity[index].external = entity.external || {}
    },
    insertRawInExistentEntity(entity: ContextStatePageContent) {
      const index = this.entity.indexOf(entity)

      if (index === -1) return

      const target = this.entity[index - 1]

      if (entity.raw === useEnv().emptyLine()) return

      if (target.raw === useEnv().emptyLine()) {
        this.entity[index - 1].raw = entity.raw
      } else {
        this.entity[index - 1].raw = target.raw + entity.raw
      }
    },
  },
})
