import { Entity, EntityType, Entities } from 'better-write-types'
import { nextTick } from 'vue'
import { useEnv } from './env'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'
import useEmitter from './emitter'
import { usePlugin } from 'better-write-plugin-core'
import { useI18n } from 'vue-i18n'
import { useInput } from './input'
import { useFactory } from './factory'
import { useStorage } from './storage/storage'
import { useRaw } from './raw'

export const useEntity = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const env = useEnv()
  const raw = useRaw()
  const emitter = useEmitter()
  const plugin = usePlugin()
  const { t } = useI18n()
  const input = useInput()
  const storage = useStorage()
  const factory = useFactory()

  const utils = () => {
    const isLink = (raw: string) => {
      return raw.match('^(http|https)://')
    }

    const isImageCommand = (raw: string) => {
      return raw.includes('data:image')
    }

    const isPageBreak = (raw: string) => {
      return raw === env.pageBreak()
    }

    const isLineBreak = (raw: string) => {
      return raw === env.lineBreak()
    }

    const entry = (input: string, target: string): boolean => {
      return (
        input.startsWith('/' + target) ||
        input.startsWith('/' + target.toUpperCase())
      )
    }

    const normalizeEmptyLines = (raw: string) => {
      let _raw = raw.replaceAll(env.emptyLine(), '')

      return _raw
    }

    const isFixed = (index: number, options?: Record<string, boolean>) => {
      const entity = CONTEXT.entities[index]

      if (!entity) return false

      if (options?.emptyLine && entity.raw === env.emptyLine()) return true

      return (
        entity.type === 'page-break' ||
        entity.type === 'line-break' ||
        entity.type === 'image' ||
        entity.type === 'drau'
      )
    }

    const isNotInput = (entity: Entity) => {
      return (
        entity.type === 'page-break' ||
        entity.type === 'line-break' ||
        entity.type === 'image' ||
        entity.type === 'drau'
      )
    }

    const getNamesByTheContent = (raw: string) => {
      if (isImageCommand(raw)) return t('plugin.logger.normalize.image')
      if (isLineBreak(raw)) return t('plugin.logger.normalize.lineBreak')
      if (isPageBreak(raw)) return t('plugin.logger.normalize.pageBreak')

      return raw
    }

    const getIndex = (entity: Entity) => {
      return CONTEXT.entities.indexOf(entity)
    }

    const isText = (type: EntityType) => {
      return (
        type === 'paragraph' ||
        type === 'heading-one' ||
        type === 'heading-two' ||
        type === 'heading-three'
      )
    }

    const isHeading = (type: EntityType) => {
      return (
        type === 'heading-one' ||
        type === 'heading-two' ||
        type === 'heading-three'
      )
    }

    const isFixedRaw = (raw: string) => {
      return (
        raw === env.emptyLine() ||
        raw === env.pageBreak() ||
        raw === env.lineBreak()
      )
    }

    return {
      entry,
      isFixed,
      isNotInput,
      getNamesByTheContent,
      normalizeEmptyLines,
      getIndex,
      isLink,
      isImageCommand,
      isPageBreak,
      isLineBreak,
      isText,
      isHeading,
      isFixedRaw,
    }
  }

  const base = () => {
    const onPaste = async (
      entity: Entity,
      value: string,
      event: any,
      el: HTMLDivElement
    ) => {
      event.preventDefault()
      event.stopPropagation()

      const data = input.pasteText(event)
      const entities: Entities = []
      let isFirst = true
      let isReallyFirst = true
      let offsetFirst = 0
      let restStr = ''

      storage.normalize().then(() => {
        const index = CONTEXT.entities.indexOf(entity)

        data.forEach(async (data: string, index: number, arr: string[]) => {
          const normalize = data.replace(/\s+/g, ' ').trim()

          if (normalize) {
            const content = factory.entity().create(entity.type)

            if (isFirst) {
              content.raw = utils().normalizeEmptyLines(content.raw)

              const offset = raw.v2().caret().index(el)

              const v = raw
                .v2()
                .html()
                .insert(value, offset || PROJECT.offsetLoaded, data)

              content.raw = v

              offsetFirst = offset + data.length

              restStr = v.substring(offsetFirst, v.length)

              if (arr.length > 1) {
                content.raw = content.raw.substring(0, offsetFirst)
              }

              isFirst = false
            } else {
              content.raw = normalize
            }

            entities.push(content)

            // create last element with restStr
            if (index === arr.length - 1 && !isReallyFirst && restStr) {
              const lastContent = factory.entity().create(entity.type)

              content.raw = restStr

              entities.push(lastContent)
            }

            isReallyFirst = false
          }
        })

        storage.normalize().then(async () => {
          CONTEXT.newInPaste(entities, entity).then(async () => {
            const position = index + entities.length - 1

            await nextTick

            raw.v2().caret().set(el, offsetFirst, true)

            emitter.emit('entity-scroll-by-index', position)

            emitter.emit('entity-open-by-index', position)

            plugin.emit('plugin-entity-paste-in-page', {
              index,
              quantity: entities.length,
            })
          })
        })
      })
    }

    const onUp = async (entity: Entity, index: number) => {
      await nextTick

      emitter.emit('entity-not-mutate', entity)

      await nextTick

      CONTEXT.switchInPage({
        entity,
        direction: 'up',
      })

      if (index === 0) return

      plugin.emit('plugin-entity-swap', {
        direction: 'up',
        index,
      })
    }

    const onDown = async (entity: Entity, index: number) => {
      await nextTick

      emitter.emit('entity-not-mutate-down', entity)

      await nextTick

      CONTEXT.switchInPage({
        entity,
        direction: 'down',
      })

      if (index === CONTEXT.entities.length - 1) return

      plugin.emit('plugin-entity-swap', {
        direction: 'down',
        index,
      })
    }

    const onUpCursor = async (entity: Entity) => {
      emitter.emit('entity-close', { all: true })

      await nextTick

      emitter.emit('entity-open', {
        entity: entity,
        up: true,
        selectionInitial: true,
        keyboard: true,
      })
    }

    const onDownCursor = async (entity: Entity) => {
      emitter.emit('entity-close', { all: true })

      await nextTick

      emitter.emit('entity-open', {
        entity,
        up: false,
        selectionInitial: true,
        keyboard: true,
      })
    }

    const onDelete = async (entity: Entity, index: number) => {
      emitter.emit('entity-not-mutate', entity)

      await nextTick

      CONTEXT.removeInPage(entity)

      await nextTick

      PROJECT.updateContext(CONTEXT.$state)

      plugin.emit('plugin-entity-delete', index)
    }

    const onDeleteRaw = async (payload: any) => {
      if (payload.index <= 0) return

      if (utils().isFixed(payload.index - 1)) return

      if (payload.data !== '') {
        CONTEXT.insertRawInExistentEntity(payload.entity)
      }

      await nextTick

      onDelete(payload.entity, payload.index)

      await nextTick
    }

    const onBoldRaw = (selection: string) => {
      return '&' + selection + '&'
    }

    const onItalicRaw = (selection: string) => {
      return '*' + selection + '*'
    }

    return {
      onPaste,
      onUp,
      onDown,
      onUpCursor,
      onDownCursor,
      onDelete,
      onDeleteRaw,
      onBoldRaw,
      onItalicRaw,
    }
  }
  return { base, utils }
}
