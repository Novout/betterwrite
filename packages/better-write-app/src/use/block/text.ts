import { useAbsoluteStore } from '@/store/absolute'
import { useContextStore } from '@/store/context'
import { useEditorStore } from '@/store/editor'
import { Entity, ID } from 'better-write-types'
import { nextTick, Ref, watch } from 'vue'
import useEmitter from '../emitter'
import { useEntity } from '../entity'
import { useEnv } from '../env'
import { useFactory } from '../factory'
import { useProject } from '../project'
import { useRaw } from '../raw'
import { useStorage } from '../storage/storage'
import { useUtils } from '../utils'

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
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()
  const ABSOLUTE = useAbsoluteStore()

  const emitter = useEmitter()
  const entity = useEntity()
  const project = useProject()
  const raw = useRaw()
  const env = useEnv()
  const utils = useUtils()
  const storage = useStorage()
  const factory = useFactory()

  const save = (target: number, raw: string) => {
    if (raw === null) return

    CONTEXT.entities[target].raw = raw
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

    emitter.on('entity-text-force-save', () => {
      if (isSalvageable.value && input.value && input.value.innerHTML) {
        save(index.value, input.value.innerHTML)

        isSalvageable.value = false
      }
    })
  }

  const onKeyboard = async (e: KeyboardEvent) => {
    const _input = input.value as HTMLDivElement

    const value = raw.v2().caret().value(_input)
    const start = raw.v2().caret().start(_input)
    const offset = utils.cursor().getCurrentCursorPosition(_input)

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

      // italic entity
      if (e.key === 'i' || e.key === 'I') {
        if (!value || props.entity.type !== 'paragraph') return

        e.preventDefault()
        e.stopPropagation()

        setData(
          raw.v2().apply({
            existent: input.value.innerHTML,
            type: 'italic',
            input: _input,
          })
        )

        await nextTick

        raw.v2().caret().set(_input, offset)
      }

      // bold entity
      if (e.key === 'b' || e.key === 'B') {
        if (!value || props.entity.type !== 'paragraph') return

        e.preventDefault()
        e.stopPropagation()

        setData(
          raw.v2().apply({
            existent: input.value.innerHTML,
            type: 'bold',
            input: _input,
          })
        )

        await nextTick

        raw.v2().caret().set(_input, offset)
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

      return
    }
    // delete in empty raw or convert
    if ((e.key === 'Delete' || e.key === 'Backspace') && start) {
      e.preventDefault()
      e.stopPropagation()

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

      return
    }

    if (
      props.isAttached ||
      (raw.v2().caret().end(input.value, true) &&
        props.entity.type === 'paragraph')
    ) {
      e.preventDefault()
      e.stopPropagation()

      const item = factory.entity().create(props.entity.type)

      CONTEXT.insert(item, index.value + 1)

      await nextTick

      await storage.normalize()

      await nextTick

      emitter.emit('entity-text-focus', {
        position: 'auto',
        target: index.value + 1,
      })
    }
  }

  return { save, onWatcher, onMounted, onKeyboard, onInput, onEnter }
}
