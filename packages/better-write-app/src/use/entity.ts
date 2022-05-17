import { Entity, EntityType } from 'better-write-types'
import { nextTick, Ref } from 'vue'
import { useEnv } from './env'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'
import useEmitter from './emitter'
import { usePlugin } from 'better-write-plugin-core'
import { useI18n } from 'vue-i18n'

export const useEntity = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const env = useEnv()
  const emitter = useEmitter()
  const plugin = usePlugin()
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
      onUp,
      onDown,
      onDelete,
      onDeleteRaw,
      onBoldRaw,
      onItalicRaw,
    }
  }
  return { base, utils }
}
