import { defineStore } from 'pinia'
import {
  ContextState,
  Entity,
  EntityType,
  ContextActionsUpdateInPage,
  ContextActionSwitchInPage,
  ContextActionSwitchEntityRaw,
  ContextActionNewInExistentEntity,
  ContextActionNewInPage,
  ContextActionNewInPagePosEdit,
  ContextActionAlterInPage,
  Entities,
} from 'better-write-types'
import { useEnv } from '../use/env'
import { useFormat } from '../use/format'
import { useUtils } from '../use/utils'
import { useProjectStore } from './project'
import { useFactory } from '@/use/factory'

export const useContextStore = defineStore('context', {
  state: (): ContextState => {
    return {
      id: 0,
      title: 'Untitled',
      entities: [],
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    }
  },
  actions: {
    load(context?: ContextState) {
      const project = useProjectStore()

      if (!context) {
        context = project.pages[0]
      }

      this.id = context.id
      project.pageLoaded = context.id

      this.entities = context.entities
    },
    addInPage(entity: Entity) {
      if (!entity || !entity.raw) return

      this.entities.push(entity)
    },
    updateInPage({ entity, raw }: ContextActionsUpdateInPage) {
      if (!entity || !entity.raw) return

      const index = this.entities.indexOf(entity)

      if (index === -1 || raw === this.entities[index].raw) return

      this.entities[index].raw = raw
      this.entities[index].updatedAt = useFormat().actually()
    },
    updateCommentInPage({ entity, raw }: ContextActionsUpdateInPage) {
      if (!entity || !entity.raw) return

      const index = this.entities.indexOf(entity)

      if (index === -1 || raw === this.entities[index].external?.comment?.raw)
        return

      if (
        !this.entities[index].external ||
        !this.entities[index].external?.comment
      ) {
        this.entities[index].external = {
          comment: {
            raw,
            createdAt: useFormat().actually(),
            updatedAt: useFormat().actually(),
          },
        }

        return
      }

      // @ts-ignore
      if (this.entities[index].external.comment.raw !== raw) {
        // @ts-ignore
        this.entities[index].external.comment.raw = raw
        // @ts-ignore
        this.entities[index].external.comment.updatedAt = useFormat().actually()
      }
    },
    removeInPage(entity: Entity) {
      if (!entity || !entity.raw) return

      const index = this.entities.indexOf(entity)

      if (
        index === -1 ||
        entity.type === 'heading-one' ||
        this.entities.length <= 1
      )
        return

      this.entities = this.entities.filter(
        (item: Entity) => this.entities.indexOf(item) !== index
      )
    },
    switchInPage({ entity, direction }: ContextActionSwitchInPage) {
      if (!entity || !entity.raw) return

      const index = this.entities.indexOf(entity)

      if (index === -1) return

      let sIndex
      direction === 'up' ? (sIndex = index - 1) : (sIndex = index + 1)

      if (
        (sIndex < 0 && direction === 'up') ||
        (sIndex >= this.entities.length && direction === 'down')
      )
        return

      const target = this.entities[sIndex]

      if (entity.type === 'heading-one' || target.type === 'heading-one') return

      const temp = this.entities[index]
      this.entities[index] = target
      this.entities[sIndex] = temp
    },
    switchEntityRaw({ entity, match, raw }: ContextActionSwitchEntityRaw) {
      if (!entity || !entity.raw) return

      const index = this.entities.indexOf(entity)

      const result = this.entities[index].raw.replaceAll(match, raw)

      this.entities[index].raw = result
    },
    newInExistentEntity(
      this: ContextState,
      payload: ContextActionNewInExistentEntity
    ) {
      if (!payload.new || !payload.new.raw) return

      const index = this.entities.indexOf(payload.old)

      if (index === -1) return

      this.entities[index].type = payload.new.type
      this.entities[index].raw = payload.new.raw
      this.entities[index].createdAt = payload.new.createdAt
      this.entities[index].updatedAt = useFormat().actually()
      this.entities[index].external = payload.new.external || {}
    },
    newInPage({ entity, type }: ContextActionNewInPage) {
      if (!entity || !entity.raw) return

      const index = this.entities.indexOf(entity as Entity)

      if (index === -1) return

      const target = useFactory()
        .entity()
        .create(type as EntityType, '')

      this.entities = useUtils().array().insert(this.entities, index, target)
    },
    newInPageInLastPosition(type: EntityType = 'paragraph') {
      const target = useFactory().entity().create(type)

      this.entities = [...this.entities, target]
    },
    newInPagePosEdit({ entity, raw, type }: ContextActionNewInPagePosEdit) {
      if (!entity || !entity.raw) return

      const index = this.entities.indexOf(entity as Entity)

      if (index === -1) return

      const target = useFactory().entity().create(type, raw)

      this.entities = useUtils()
        .array()
        .insert(this.entities, index + 1, target)
    },
    alterInPage({ entity, type }: ContextActionAlterInPage) {
      if (!entity || !entity.raw) return

      const index = this.entities.indexOf(entity as Entity)

      if (index === -1) return

      let raw = entity.raw

      if (entity.type === 'image') {
        raw = useEnv().emptyLine() // reset base64
      }

      this.entities[index].type = type as EntityType
      this.entities[index].raw = raw
      this.entities[index].createdAt = useFormat().actually()
      this.entities[index].updatedAt = useFormat().actually()
      this.entities[index].visual = {
        info: false,
        warning: false,
        error: false,
      }
      this.entities[index].external = entity.external || {}
    },
    insertRawInExistentEntity(entity: Entity) {
      if (!entity || !entity.raw) return

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
    newInPaste(entities: Entities, initial: Entity): Promise<any> {
      return new Promise((res, rej) => {
        let isInsert = false

        if (!initial || !initial.raw) rej()

        const start = this.entities.indexOf(initial)

        entities.reverse().forEach(async (entity: Entity) => {
          if (!entity.raw) return

          this.entities = useUtils()
            .array()
            .insert(this.entities, start + 1, entity)

          isInsert = true
        })

        isInsert ? res(this.removeInPage(initial)) : res(() => {})
      })
    },
  },
})
