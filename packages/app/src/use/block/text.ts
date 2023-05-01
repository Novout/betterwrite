import { useAbsoluteStore } from '@/store/absolute'
import { useContextStore } from '@/store/context'
import { useEditorStore } from '@/store/editor'
import { Entity, EntityType, ID } from 'better-write-types'
import { getImageFileRaw } from 'better-write-image-converter'
import { nextTick, Ref, watch } from 'vue'
import useEmitter from '../emitter'
import { useEntity } from '../entity'
import { useEnv } from '../env'
import { useFactory } from '../factory'
import { useProject } from '../project'
import { useRaw } from '../raw'
import { useStorage } from '../storage/storage'
import { useUtils } from '../utils'
import { html } from '../raw'
import { useProjectStore } from '@/store/project'
import { useHistoryStore } from '@/store/history'
import { Calls, usePlugin } from 'better-write-plugin-core'
import { useFormat } from '../format'

export const useBlockText = ({
  props,
  focused,
  input,
  isSalvageable,
  index,
}: {
  props: { entity: Entity; isAttached?: boolean }
  focused: Ref<boolean>
  input: Ref<HTMLDivElement>
  isSalvageable: Ref<boolean>
  index: Ref<ID<number>>
}) => {
  const HISTORY = useHistoryStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const emitter = useEmitter()
  const entity = useEntity()
  const project = useProject()
  const plugin = usePlugin()
  const raw = useRaw()
  const env = useEnv()
  const utils = useUtils()
  const storage = useStorage()
  const factory = useFactory()
  const format = useFormat()

  const save = (target: number, raw: string) => {
    if (raw === null) return

    CONTEXT.entities[target].raw = raw

    if (EDITOR.configuration.trackEntities) {
      CONTEXT.entities[target].updatedAt = format.actually('iso')
    }

    Calls.EditorEntityTextSaved(plugin)
  }

  const setData = (val: string) => {
    input.value.innerHTML = val
  }

  const onWatcher = () => {
    /* speech API */
    watch(focused, (_focused) => {
      if (_focused && !entity.utils().isFixed(index.value)) {
        EDITOR.actives.entity.index = index.value

        if (ABSOLUTE.tools.speechRecognition) {
          project.utils().resetAllVisual()

          CONTEXT.entities[index.value].visual.warning = true
        }
      }

      /* save block */
      if (!_focused) {
        save(index.value, input.value.innerHTML)

        isSalvageable.value = false
      }
    })
  }

  const onMounted = () => {
    if (input.value.innerHTML.includes(env.emptyLine()))
      input.value.innerHTML = ''

    emitter.on(
      'entity-text-focus',
      async ({ target, position, positionOffset }) => {
        await nextTick

        if (CONTEXT.entities[target] === props.entity) {
          switch (position) {
            case 'start':
              raw.v2().caret().set(input.value, 0)
              break
            case 'end':
              raw.v2().caret().setEnd(input.value)
              break
            case 'offset':
              raw
                .v2()
                .caret()
                .set(input.value, positionOffset as number)
              break
            case 'auto':
              input?.value.focus()
              break
          }
        }
      }
    )

    emitter.on('entity-speech-recognition', ({ id, result }) => {
      if (id === index.value) CONTEXT.entities[id].raw = result
    })

    emitter.on('entity-text-force-save', () => {
      if (isSalvageable.value && input.value && input.value.innerHTML) {
        save(index.value, input.value.innerHTML)

        isSalvageable.value = false
      }
    })
  }

  const onDynamicInserts = (e: KeyboardEvent, offset: number) => {
    const value = utils.text().defaultWhitespace(input.value.innerHTML)

    PROJECT.shortcuts.inserts.forEach(({ key, value: insert }) => {
      if (e.altKey && e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault()
        e.stopPropagation()

        const sub = html().insert(value, offset, insert)

        setData(sub)

        const _offset = insert.length + offset

        emitter.emit('entity-text-focus', {
          target: index.value,
          position: 'offset',
          positionOffset: _offset,
        })
      }
    })
  }

  const onCharactersHandler = () => {
    const inner = utils.text().defaultWhitespace(input.value.innerHTML)

    emitter.emit('characters-handler', { index: index.value, inner })
  }

  const onKeyboard = async (e: KeyboardEvent) => {
    const _input = input.value as HTMLDivElement

    const start = raw.v2().caret().start(_input)
    const offset = utils.cursor().getCurrentCursorPosition(_input)

    onDynamicInserts(e, offset)
    onCharactersHandler()

    if (e.ctrlKey && e.shiftKey) {
      if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault()
        e.stopPropagation()

        plugin.emit('plugin-entity-undo')

        return
      }
    }

    if (e.shiftKey) {
      if (e.key === 'ArrowUp') {
        // to up
        e.preventDefault()
        e.stopPropagation()

        await storage.normalize()

        entity.base().onUp(props.entity, index.value)
      } else if (e.key === 'ArrowDown') {
        // to down
        e.preventDefault()
        e.stopPropagation()

        await storage.normalize()

        entity.base().onDown(props.entity, index.value)
      }

      return
    }
    // in ctrl press
    if (e.ctrlKey) {
      // finder
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        e.stopPropagation()

        ABSOLUTE.shortcuts.finder = true
      }

      // swapper
      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault()
        e.stopPropagation()

        ABSOLUTE.shortcuts.switcher = true
      }

      // delete entity
      if (e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        e.stopPropagation()

        entity.base().onDelete(props.entity, index.value)
      }

      // to entity initial
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        e.stopPropagation()

        await storage.normalize()

        await nextTick

        emitter.emit('entity-text-focus', {
          target: index.value - 1,
          position: 'end',
        })
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        e.stopPropagation()

        await storage.normalize()

        await nextTick

        emitter.emit('entity-text-focus', {
          target: index.value + 1,
          position: 'end',
        })
      }
      // text attached
      if (
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '6' ||
        e.key === '7'
      ) {
        e.preventDefault()
        e.stopPropagation()

        emitter.emit('entity-text-force-save')

        await nextTick

        const value = index.value + 1

        let type: EntityType = 'paragraph'

        switch (e.key) {
          case '1':
            type = 'paragraph'
            break
          case '2':
            type = 'heading-two'
            break
          case '3':
            type = 'heading-three'
            break
          case '6':
            type = 'checkbox'
            break
          case '7':
            type = 'list'
            break
        }

        const entity = factory.entity().create(type)

        CONTEXT.insert(entity, value)

        await nextTick

        emitter.emit('entity-text-focus', {
          target: value,
          position: 'auto',
        })

        HISTORY.stack.push({
          items: [
            {
              index: value,
              entity,
              type: 'insert',
            },
          ],
        })
      }

      // fixeds
      if (e.key === '4' || e.key === '5' || e.key === '9') {
        e.preventDefault()
        e.stopPropagation()

        emitter.emit('entity-text-force-save')

        await nextTick

        const value = index.value + 1

        let type: EntityType = 'line-break'

        switch (e.key) {
          case '4':
            type = 'page-break'
            break
          case '5':
            type = 'line-break'
            break
          case '9':
            type = 'drau'
            break
        }

        const entity = factory.entity().create(type)

        CONTEXT.insert(entity, value)

        await nextTick

        const paragraph = factory.entity().create('paragraph')

        CONTEXT.insert(paragraph, value + 1)

        await nextTick

        emitter.emit('entity-text-focus', {
          target: value + 1,
          position: 'auto',
        })

        await nextTick

        HISTORY.stack.push({
          items: [
            {
              index: value,
              entity,
              type: 'insert',
            },
            {
              index: value,
              entity: paragraph,
              type: 'insert',
            },
          ],
        })
      }

      // image
      if (e.key === '8') {
        e.preventDefault()
        e.stopPropagation()

        emitter.emit('entity-text-force-save')

        await nextTick

        const value = index.value + 1

        getImageFileRaw()
          .then(async ({ raw, fileName }) => {
            const entity = factory.entity().create('image', raw)
            entity.external!.image!.name = fileName

            CONTEXT.insert(entity, value)

            await nextTick

            const paragraph = factory.entity().create('paragraph')

            CONTEXT.insert(paragraph, value + 1)

            await nextTick

            emitter.emit('entity-text-focus', {
              target: value + 1,
              position: 'auto',
            })

            await storage.normalize()

            HISTORY.stack.push({
              items: [
                {
                  index: value,
                  entity,
                  type: 'insert',
                },
                {
                  index: value + 1,
                  entity: paragraph,
                  type: 'insert',
                },
              ],
            })
          })
          .catch(() => {})
      }

      return
    }
    // delete in empty raw or convert
    if ((e.key === 'Delete' || e.key === 'Backspace') && start) {
      e.preventDefault()
      e.stopPropagation()

      await storage.normalize({ soft: true })

      entity.base().onDeleteRaw({
        index: index.value,
        data: input.value.innerHTML,
        entity: props.entity,
      })

      if (index.value <= 1) return

      if (entity.utils().isFixed(index.value - 1)) return

      entity.base().onDelete(props.entity, index.value)

      return
    }

    onArrows(e)
  }

  const onInput = () => {
    isSalvageable.value = true
  }

  const onPaste = (e: ClipboardEvent) => {
    if (e.clipboardData) {
      e.preventDefault()
      const text = e.clipboardData.getData('text/plain')
      window.document.execCommand('insertText', false, text)
    }
  }

  const onArrows = async (e: KeyboardEvent) => {
    const _input = input.value as HTMLDivElement

    const end = raw.v2().caret().end(_input)
    const start = raw.v2().caret().start(_input)

    if (e.key === 'ArrowUp') {
      // to top
      if (start) {
        if (
          props.entity.type === 'heading-one' ||
          entity.utils().isFixed(index.value - 1)
        )
          return

        await nextTick

        emitter.emit('entity-text-focus', {
          target: index.value - 1,
          position: 'end',
        })
      }
    } else if (e.key === 'ArrowDown') {
      // to bottom
      if (end) {
        if (entity.utils().isFixed(index.value + 1)) return

        await nextTick

        emitter.emit('entity-text-focus', {
          target: index.value + 1,
          position: 'end',
        })
      }
    }
  }

  const onEnter = async (e: KeyboardEvent) => {
    if (entity.utils().isHeading(props.entity.type)) {
      CONTEXT.newInPagePosEdit({
        entity: props.entity,
        type: 'paragraph',
      })

      await nextTick

      emitter.emit('entity-text-focus', {
        target: index.value + 1,
        position: 'auto',
      })

      await nextTick

      HISTORY.stack.push({
        items: [
          {
            index: index.value + 1,
            entity: props.entity,
            type: 'insert',
          },
        ],
      })

      return
    }

    if (
      props.isAttached ||
      (raw.v2().caret().end(input.value, true) &&
        props.entity.type === 'paragraph' &&
        EDITOR.configuration.entity.insertEntityInParagraphBreakLine)
    ) {
      e.preventDefault()
      e.stopPropagation()

      const item = factory.entity().create(props.entity.type)

      CONTEXT.insert(item, index.value + 1)

      await nextTick

      emitter.emit('entity-text-force-save')

      await nextTick

      emitter.emit('entity-text-focus', {
        position: 'auto',
        target: index.value + 1,
      })

      await nextTick

      HISTORY.stack.push({
        items: [
          {
            index: index.value + 1,
            entity: item,
            type: 'insert',
          },
        ],
      })
    }
  }

  return { save, onWatcher, onMounted, onKeyboard, onInput, onPaste, onEnter }
}
