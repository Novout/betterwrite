import { Entity } from '@/types/context'
import { ContextState } from '@/types/context'
import { useScroll } from '@/use/scroll'
import { computed, reactive, nextTick, watch, ref } from 'vue'
import { useEnv } from './env'
import { useProjectStore } from '@/store/project'
import { useEditorStore } from '@/store/editor'
import { useContextStore } from '@/store/context'
import useEmitter from './emitter'
import usePlugin from './plugin/core'
import { useI18n } from 'vue-i18n'
import { useInput } from './input'
import { useFormat } from './format'
import { useFactory } from './factory'
import { Entities } from '../types/context'
import { useStorage } from './storage/storage'
import { useAbsoluteStore } from '@/store/absolute'

export const useEntity = () => {
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()

  const env = useEnv()
  const emitter = useEmitter()
  const plugin = usePlugin()
  const { t } = useI18n()
  const input = useInput()
  const format = useFormat()
  const storage = useStorage()
  const factory = useFactory()

  const pages = computed(() => PROJECT.pages)
  const selection = computed(() => EDITOR.actives.text.selection.content)

  watch(selection, (_content) => {
    fstate.entry = _content
    sstate.entry = _content

    finder().onFinder()
  })

  const sstate = reactive({
    entry: EDITOR.actives.text.selection.content || ('' as string),
    output: '' as string,
    equal: true as boolean,
  })
  const sentry = ref<HTMLElement | null>(null)
  const fstate = reactive({
    entry: EDITOR.actives.text.selection.content || ('' as string),
    actuallyLetterCounter: 0 as number,
    actuallyLetterRaw: '' as string,
    listOfLettersExists: [] as Array<Record<string, any>>,
    maxLetterCounter: 0 as number,
  })

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

    const isFixed = (index: number, options?: Record<string, boolean>) => {
      const entity = CONTEXT.entities[index]

      if (!entity) return false

      if (options?.emptyLine && entity.raw === env.emptyLine()) return true

      return (
        entity.type === 'page-break' ||
        entity.type === 'line-break' ||
        entity.type === 'image'
      )
    }

    const getNamesByTheContent = (raw: string) => {
      if (isImageCommand(raw)) return t('plugin.logger.normalize.image')
      if (isLineBreak(raw)) return t('plugin.logger.normalize.lineBreak')
      if (isPageBreak(raw)) return t('plugin.logger.normalize.pageBreak')

      return raw
    }

    return {
      entry,
      isFixed,
      getNamesByTheContent,
      isLink,
      isImageCommand,
      isPageBreak,
      isLineBreak,
    }
  }

  const swapper = () => {
    const switcherText = ({ entry, output, equal }: Record<any, any>) => {
      const arr = CONTEXT.entities

      // TODO: Deletar em caso de output vazio
      if (!entry || !output) return

      arr.forEach((e: Entity) => {
        const text = e.raw.split(' ')

        text.forEach((t: string) => {
          if (equal && t === entry) {
            CONTEXT.switchEntityRaw({
              entity: e,
              match: t,
              raw: output,
            })
          } else if (!equal && t.includes(entry)) {
            CONTEXT.switchEntityRaw({
              entity: e,
              match: entry,
              raw: output,
            })
          }
        })
      })
    }

    const onSwitcherAll = () => {
      switcherText({
        entry: sstate.entry,
        output: sstate.output,
        equal: sstate.equal,
      })
    }

    return { switcherText, onSwitcherAll }
  }

  const finder = () => {
    const onFinder = () => {
      fstate.listOfLettersExists = []
      fstate.actuallyLetterCounter = 0
      fstate.actuallyLetterRaw = ''
      fstate.maxLetterCounter = 0

      pages.value.forEach((context: ContextState) => {
        context.entities.forEach((entity: Entity) => {
          if (!fstate.entry) return

          if (entity.raw.includes(fstate.entry)) {
            fstate.listOfLettersExists.push({ entity, page: context })
            fstate.maxLetterCounter++
          }
        })
      })

      if (fstate.maxLetterCounter === 0) return

      onSearchGo(fstate.listOfLettersExists[0])
    }

    const onSearchGo = (object: Record<string, any>) => {
      fstate.actuallyLetterRaw = object.letter
      fstate.actuallyLetterCounter =
        fstate.listOfLettersExists.indexOf(object) + 1

      const pageIndex = PROJECT.pages.indexOf(object.page)
      const entityIndex = PROJECT.pages[pageIndex].entities.indexOf(
        object.entity
      )

      onGo(`entity-${entityIndex}`, object.page)
    }

    const onGo = async (go: string | symbol, page: ContextState) => {
      if (!ABSOLUTE.shortcuts.finder && !ABSOLUTE.shortcuts.switcher) return

      if (CONTEXT.id !== page.id) CONTEXT.load(page)
      await nextTick
      useScroll().to(`#${String(go)}`, 'center')
    }

    const onUp = () => {
      if (fstate.actuallyLetterCounter >= fstate.maxLetterCounter) {
        onSearchGo(fstate.listOfLettersExists[0])
      } else {
        const object = fstate.listOfLettersExists[fstate.actuallyLetterCounter]

        onSearchGo(object)
      }
    }

    const onDown = () => {
      if (fstate.actuallyLetterCounter <= 1) {
        onSearchGo(
          fstate.listOfLettersExists[fstate.listOfLettersExists.length - 1]
        )
      } else {
        const object =
          fstate.listOfLettersExists[fstate.actuallyLetterCounter - 2]

        onSearchGo(object)
      }
    }

    return { onFinder, onSearchGo, onGo, onUp, onDown }
  }

  const base = () => {
    const onPaste = async (entity: Entity, value: string, event: any) => {
      if (value !== '') return

      event.preventDefault()
      event.stopPropagation()

      const data = input.pasteText(event)
      const entities: Entities = []

      const index = CONTEXT.entities.indexOf(entity)

      data.forEach(async (raw: string) => {
        const normalize = raw.replace(/\s+/g, ' ').trim()

        if (normalize) {
          const content = factory.entity().create(entity.type)

          content.raw = normalize

          entities.push(content)
        }
      })

      storage.normalize().then(async () => {
        CONTEXT.newInPaste(entities, entity).then(() => {
          const position = index + entities.length - 1

          emitter.emit('entity-scroll-by-index', position)

          emitter.emit('entity-open-by-index', position)

          plugin.emit('plugin-entity-paste-in-page', {
            index,
            quantity: entities.length,
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
      })
    }

    const onDownCursor = async (entity: Entity) => {
      emitter.emit('entity-close', { all: true })

      await nextTick

      emitter.emit('entity-open', {
        entity,
        up: false,
        selectionInitial: true,
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

      onDelete(payload.entity, payload.index)

      await nextTick

      emitter.emit('entity-open', { entity: payload.entity, up: true })

      plugin.emit('plugin-entity-delete', payload.index)
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
  return { base, utils, swapper, finder, fstate, sstate, sentry }
}
