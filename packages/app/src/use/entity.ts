import { Entity, EntityType, ID } from 'better-write-types'
import { nextTick } from 'vue'
import { useEnv } from './env'
import { useContextStore } from '@/store/context'
import useEmitter from './emitter'
import { usePlugin } from 'better-write-plugin-core'
import { useI18n } from 'vue-i18n'
import { useStorage } from './storage/storage'
import { useHistoryStore } from '@/store/history'
import { useAbsoluteStore } from '@/store/absolute'
import { useFactory } from './factory'
import { useEditorStore } from '@/store/editor'

export const useEntity = () => {
  const HISTORY = useHistoryStore()
  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()
  const EDITOR = useEditorStore()

  const env = useEnv()
  const emitter = useEmitter()
  const plugin = usePlugin()
  const storage = useStorage()
  const factory = useFactory()
  const { t } = useI18n()

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
        type === 'heading-three' ||
        type === 'list' ||
        type === 'checkbox'
      )
    }

    const isTextBlock = (type: EntityType) => {
      return type === 'paragraph' || type === 'list' || type === 'checkbox'
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
      isTextBlock,
      isHeading,
      isFixedRaw,
    }
  }

  const base = () => {
    const onParagraphCustomize = async (entity: Entity) => {
      const _index: number = CONTEXT.entities.indexOf(entity)

      EDITOR.actives.entity.index = _index

      if (!entity.external?.paragraph) {
        CONTEXT.entities[_index].external = {
          ...CONTEXT.entities[_index].external,
          ...factory.entity().setText(),
        }
      }

      await nextTick

      ABSOLUTE.entity.customize = true
    }

    const onParagraphComment = async (entity: Entity) => {
      EDITOR.actives.entity.index = CONTEXT.entities.indexOf(entity)

      await nextTick

      ABSOLUTE.entity.comment = true
    }

    const onUp = async (entity: Entity, index: number) => {
      CONTEXT.switchInPage({
        entity,
        direction: 'up',
      })

      await nextTick

      emitter.emit('entity-text-focus', {
        position: 'end',
        target: index - 1,
      })

      if (index === 0) return

      plugin.emit('plugin-entity-swap', {
        direction: 'up',
        index,
      })
    }

    const onDown = async (entity: Entity, index: number) => {
      CONTEXT.switchInPage({
        entity,
        direction: 'down',
      })

      await nextTick

      emitter.emit('entity-text-focus', {
        position: 'end',
        target: index + 1,
      })

      if (index === CONTEXT.entities.length - 1) return

      plugin.emit('plugin-entity-swap', {
        direction: 'down',
        index,
      })
    }

    const onDelete = async (entity: Entity, index: number) => {
      CONTEXT.removeInPage(entity)

      await nextTick

      emitter.emit('entity-text-focus', {
        position: 'end',
        target: index - 1,
      })

      HISTORY.stack.push({
        items: [
          {
            index,
            entity,
            type: 'delete',
          },
        ],
      })

      await nextTick

      await storage.normalize()
    }

    const onDeleteRaw = async (payload: any) => {
      if (payload.index <= 0) return

      if (utils().isFixed(payload.index - 1)) return

      if (payload.data) {
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

    const onSwitch = async (type: EntityType, index: ID<number>) => {
      CONTEXT.alterInPage({
        entity: CONTEXT.entities[index],
        type,
      })

      await nextTick

      emitter.emit('entity-text-focus', {
        position: 'end',
        target: index,
      })

      plugin.emit('plugin-entity-alter-in-page', {
        data: t(`editor.entity.${type}`).toUpperCase(),
        index,
      })

      await nextTick

      await storage.normalize()
    }

    const onNew = async (
      entity: Entity,
      index: ID<number>,
      type: EntityType,
    ) => {
      CONTEXT.newInPageByOption({
        entity,
        type,
      })

      await nextTick

      emitter.emit('entity-text-focus', {
        position: 'end',
        target: index + 1,
      })

      plugin.emit('plugin-entity-create', {
        data: entity.raw,
        index: CONTEXT.entities.indexOf(entity),
      })

      await nextTick

      await storage.normalize()
    }

    return {
      onParagraphCustomize,
      onParagraphComment,
      onUp,
      onDown,
      onDelete,
      onDeleteRaw,
      onBoldRaw,
      onItalicRaw,
      onSwitch,
      onNew,
    }
  }
  return { base, utils }
}
