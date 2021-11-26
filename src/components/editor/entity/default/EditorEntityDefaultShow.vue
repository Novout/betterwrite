<template>
  <section
    class="w-full relative px-4 md:px-14"
    :class="
      style.entity.shadow ? 'shadow-winset dark:shadow-binset p-0 m-0' : ''
    "
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="onClickInEntity"
  >
    <EditorEntityDefaultShowPopover
      v-if="hover && props.entity.type !== 'heading-one'"
      :entity="props.entity"
    />
    <section v-if="commands" class="absolute z-max left-40 -top-60">
      <EditorCommands />
    </section>
    <div
      ref="input"
      :contenteditable="editable"
      :spellcheck="true"
      :placeholder="t('editor.text.placeholder.base')"
      :style="{ minHeight: '24px', whiteSpace: 'break-spaces' }"
      :class="raw.v2().style(props.entity, style)"
      @input="onInput"
      @keypress.enter.prevent="onEnter"
      @keydown="onKeyboard"
      @click="onClick"
      @paste="entity.base().onPaste(props.entity, data, $event)"
      @copy="raw.v2().copy()"
      v-html="raw.v2().purge().editor(props.entity)"
    />
  </section>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick, computed, onMounted } from 'vue'
  import { useRaw } from '@/use/raw'
  import useEmitter from '@/use/emitter'
  import { useEnv } from '@/use/env'
  import { useEntity } from '@/use/entity'
  import { useFactory } from '@/use/factory'
  import { useToast } from 'vue-toastification'
  import { useI18n } from 'vue-i18n'
  import { Entity, EntityShowEditOptions } from '@/types/context'
  import { VueEmitterEntityOpen, VueEmitterEntityClose } from '@/types/emitter'
  import { useScroll } from '@/use/scroll'
  import { useContextStore } from '@/store/context'
  import { useProjectStore } from '@/store/project'
  import { useEditorStore } from '@/store/editor'
  import { useAbsoluteStore } from '@/store/absolute'
  import usePlugin from '@/use/plugin/core'
  import { ID } from '@/types/utils'
  import { useUtils } from '@/use/utils'

  const props = defineProps({
    entity: {
      required: true,
      type: Object as () => Entity,
    },
  })

  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const ABSOLUTE = useAbsoluteStore()

  const toast = useToast()
  const emitter = useEmitter()
  const env = useEnv()
  const entity = useEntity()
  const factory = useFactory()
  const scroll = useScroll()
  const { t } = useI18n()
  const raw = useRaw()
  const plugin = usePlugin()

  const hover = ref<boolean>(false)
  const focus = ref<boolean>(false)
  const edit = ref<boolean>(false)
  const commands = ref<boolean>(false)
  const old_raw = ref<number>(props.entity.raw.length)

  const data = ref<string>('')
  const input = ref<HTMLDivElement | null>(null)
  const keyboard = ref<boolean>(false)

  const style = computed(() => EDITOR.styles.show)
  const _index = computed(() => CONTEXT.entities.indexOf(props.entity))
  const editable = computed(() => !entity.utils().isFixed(_index.value))

  watch(hover, async (_hover) => {
    emitter.emit('entity-hover', _hover)

    await nextTick
    if (_hover) {
      onEdit()
    } else {
      keyboard.value = false
    }
  })

  watch(edit, async (_edit) => {
    await nextTick
    if (_edit) {
      if (!hover.value || keyboard.value) input.value?.focus()

      props.entity.raw === env.emptyLine()
        ? (data.value = '')
        : (data.value = props.entity.raw)

      emitter.emit('entity-close', props.entity)
    } else {
      focus.value = false
    }
  })

  const setData = (val: string) => {
    const _input = input.value as HTMLDivElement

    data.value = val
    _input.innerHTML = val
  }

  watch(data, async (_data: string) => {
    if (_data === env.emptyLine()) {
      setData('')
    }

    data.value = data.value.replace(/\n/g, '')

    plugin.emit('plugin-input-watch-initial', {
      data: _data.replace(props.entity.raw, ''),
      index: _index.value,
    })

    if (
      data.value.startsWith(EDITOR.configuration.commands.prefix) &&
      data.value.length <= EDITOR.configuration.commands.prefix.length + 1
    ) {
      scroll.to(`#entity-${_index.value}`, 'center')
      commands.value = true
    } else {
      commands.value = false
    }

    if (
      entity
        .utils()
        .entry(_data, EDITOR.configuration.commands.paragraph.prefix)
    ) {
      setData('')

      CONTEXT.newInExistentEntity({
        old: props.entity,
        new: factory.entity().create('paragraph'),
      })
    }

    if (
      entity
        .utils()
        .entry(_data, EDITOR.configuration.commands.headingTwo.prefix)
    ) {
      setData('')

      CONTEXT.newInExistentEntity({
        old: props.entity,
        new: factory.entity().create('heading-two'),
      })
    }

    if (
      entity
        .utils()
        .entry(_data, EDITOR.configuration.commands.headingThree.prefix)
    ) {
      setData('')

      CONTEXT.newInExistentEntity({
        old: props.entity,
        new: factory.entity().create('heading-three'),
      })
    }

    if (
      entity
        .utils()
        .entry(_data, EDITOR.configuration.commands.pageBreak.prefix)
    ) {
      setData('')

      CONTEXT.newInExistentEntity({
        old: props.entity,
        new: factory.entity().create('page-break'),
      })

      await nextTick

      emitter.emit('entity-not-mutate-down', props.entity)
    }

    if (
      entity
        .utils()
        .entry(_data, EDITOR.configuration.commands.lineBreak.prefix)
    ) {
      setData('')

      CONTEXT.newInExistentEntity({
        old: props.entity,
        new: factory.entity().create('line-break'),
      })

      await nextTick

      emitter.emit('entity-not-mutate-down', props.entity)
    }

    if (
      entity.utils().entry(_data, EDITOR.configuration.commands.image.prefix)
    ) {
      setData('')

      factory.simulate().file(
        async (content: Entity) => {
          edit.value = false

          CONTEXT.newInExistentEntity({
            old: props.entity,
            new: content,
          })

          await nextTick

          emitter.emit('entity-not-mutate-down', props.entity)
        },
        () => {
          toast.error(t('toast.generics.error'))
        }
      )
    }

    const dialogue =
      EDITOR.configuration.commands.prefix +
      EDITOR.configuration.commands.dialogue.prefix

    if (_data.includes(dialogue)) {
      const offset = _data.indexOf(dialogue) + dialogue.length
      const sub = _data.replace(
        dialogue,
        EDITOR.configuration.commands.dialogue.value
      )

      setData(sub)

      raw
        .v2()
        .caret()
        .set(input.value as HTMLDivElement, offset, true)
    }
  })

  onMounted(() => {
    emitter.on(
      'entity-close',
      (ent?: Entity, options?: VueEmitterEntityClose) => {
        if (document.activeElement === input.value) return

        if (options?.all) {
          onUpdateContent()
          return
        }

        if (!ent) return

        const index = CONTEXT.entities.indexOf(ent)

        if (CONTEXT.entities[index] === props.entity) return

        if (edit.value) onUpdateContent()
      }
    )

    emitter.on('entity-open', async (payload: VueEmitterEntityOpen) => {
      const index = CONTEXT.entities.indexOf(payload.entity)

      if (payload?.up && CONTEXT.entities[index - 1] === props.entity) {
        onEdit(undefined, {
          keyboard: true,
          selectionInitial: payload?.selectionInitial,
          switch: payload?.switch,
          cursor: payload?.cursor,
        })
      }

      if (!payload?.up && CONTEXT.entities[index + 1] === props.entity) {
        onEdit(undefined, {
          keyboard: true,
          selectionInitial: payload?.selectionInitial,
          switch: payload?.switch,
          cursor: payload?.cursor,
        })
      }
    })

    emitter.on('entity-open-by-index', (index: ID<number>) => {
      if (CONTEXT.entities[index] === props.entity) {
        onEdit()
        return
      }
    })

    emitter.on('entity-scroll-by-index', async (index: ID<number>) => {
      if (CONTEXT.entities[index] === props.entity) {
        await nextTick
        scroll.to(`#entity-${index}`, 'center')
      }
    })

    emitter.on('entity-focus', () => {
      if (document.activeElement === input.value) return

      focus.value = false
      edit.value = false
    })

    emitter.on('entity-open-last', () => {
      const length = CONTEXT.entities.length
      const entity = CONTEXT.entities[length - 1]

      if (entity === props.entity) {
        onEdit()
      }
    })

    emitter.on('entity-not-mutate', async (entity: Entity) => {
      const _id = CONTEXT.entities.indexOf(entity)

      focus.value = false
      edit.value = false
      keyboard.value = false

      await nextTick

      if (CONTEXT.entities[_id - 1] === props.entity) {
        keyboard.value = true

        onEdit()
      }
    })

    emitter.on('entity-not-mutate-down', async (entity: Entity) => {
      const _id = CONTEXT.entities.indexOf(entity)

      focus.value = false
      edit.value = false
      keyboard.value = false

      await nextTick

      if (CONTEXT.entities[_id + 1] === props.entity) {
        keyboard.value = true
        onEdit()
      }
    })

    emitter.on('project-save', () => {
      emitter.emit('entity-close', { all: true })
    })

    emitter.on('entity-force-close', () => {
      onUpdateContent()
    })

    emitter.on('entity-update-area', () => {})

    emitter.on('entity-edit-reset', () => {
      edit.value = false
      focus.value = false
    })

    emitter.on('entity-edit-open', () => {
      edit.value = true
    })

    emitter.on('entity-edit-save', async () => {
      if (edit.value) {
        edit.value = false
        await nextTick
        onUpdateContent()

        if (data.value !== props.entity.raw && data.value) {
          plugin.emit('plugin-entity-create', {
            data: data.value,
            index: _index.value,
          })
        }
      }
    })
  })

  const onUpdateContent = async () => {
    CONTEXT.updateInPage({
      entity: props.entity,
      raw: data.value,
    })

    await nextTick

    PROJECT.updateContext(CONTEXT.$state)

    if (!focus.value) edit.value = false
  }

  const onEdit = async (e?: MouseEvent, options?: EntityShowEditOptions) => {
    onStopEvents(e)

    if (
      props.entity.type === 'page-break' ||
      props.entity.type === 'line-break' ||
      props.entity.type === 'image'
    ) {
      emitter.emit('entity-close', { all: true })
      return
    }

    if (options?.keyboard) {
      emitter.emit('entity-focus')
    }

    await nextTick

    edit.value = true

    await nextTick

    if (options?.cursor) {
      // set cursor in max old content position
      raw
        .v2()
        .caret()
        .set(input.value as HTMLDivElement, old_raw.value)

      // update old raw
      old_raw.value = data.value.length
    }
  }

  const onEnter = async () => {
    const _input = input.value as HTMLDivElement

    const position = raw.v2().caret().index(_input)
    const end = raw.v2().caret().end(_input)
    const start = raw.v2().caret().start(_input)

    const posRaw = data.value.slice(position)

    let initial = false

    // actually entity is last
    if (_index.value + 1 === CONTEXT.entities.length) {
      if (start) {
        emitter.emit('entity-input-raw', data.value)
        setData('')
      } else {
        setData(data.value.replace(posRaw, ''))
        emitter.emit('entity-input-raw', posRaw)
      }

      emitter.emit('entity-input-focus')
      return
    }

    if (end) {
      CONTEXT.newInPagePosEdit({
        entity: props.entity,
        type: 'paragraph',
      })

      plugin.emit('plugin-entity-create-empty', _index.value + 1)
    } else {
      if (start) {
        CONTEXT.newInPagePosEdit({
          entity: props.entity,
          type: 'paragraph',
          raw: data.value,
        })

        plugin.emit('plugin-entity-page-break', {
          data: data.value,
          index: _index.value + 1,
        })

        setData(env.emptyLine() as string)

        initial = true
      } else {
        setData(data.value.replace(posRaw, ''))

        CONTEXT.newInPagePosEdit({
          entity: props.entity,
          type: 'paragraph',
          raw: posRaw,
        })

        plugin.emit('plugin-entity-page-break', {
          data: posRaw,
          index: _index.value,
        })

        initial = true
      }
    }

    await nextTick

    onUpdateContent()

    await nextTick

    emitter.emit('entity-open', {
      entity: props.entity,
      up: false,
      keyboard: true,
      selectionInitial: initial,
    })
  }

  const onKeyboard = async (e: KeyboardEvent) => {
    const _input = input.value as HTMLDivElement

    const value = raw.v2().caret().value(_input)
    // const position = raw.v2().caret().index(_input)
    const end = raw.v2().caret().end(_input)
    const start = raw.v2().caret().start(_input)
    // const empty = raw.v2().caret().empty(_input)
    const offset = useUtils().cursor().getCurrentCursorPosition(_input)

    if (e.shiftKey) {
      if (e.key === 'ArrowUp') {
        // to up
        e.preventDefault()
        e.stopPropagation()

        onUpdateContent()

        entity.base().onUp(props.entity, _index.value)
      } else if (e.key === 'ArrowDown') {
        // to down
        e.preventDefault()
        e.stopPropagation()

        onUpdateContent()

        entity.base().onDown(props.entity, _index.value)
      }

      return
    }

    // in ctrl press
    if (e.ctrlKey) {
      // finder
      if (e.key === 'f' || e.key === 'F') {
        ABSOLUTE.shortcuts.finder = !ABSOLUTE.shortcuts.finder
      }

      // swapper
      if (e.key === 'h' || e.key === 'H') {
        ABSOLUTE.shortcuts.finder = !ABSOLUTE.shortcuts.switcher
      }

      // delete entity
      if (e.key === 'd' || e.key === 'D') {
        entity.base().onDelete(props.entity, _index.value)
      }

      // italic entity
      if (e.key === 'i' || e.key === 'I') {
        if (!value || props.entity.type !== 'paragraph') return

        setData(
          raw
            .v2()
            .apply({ existent: data.value, type: 'italic', input: _input })
        )

        await nextTick

        raw.v2().caret().set(_input, offset)
      }

      // bold entity
      if (e.key === 'b' || e.key === 'B') {
        if (!value || props.entity.type !== 'paragraph') return

        setData(
          raw.v2().apply({ existent: data.value, type: 'bold', input: _input })
        )

        await nextTick

        raw.v2().caret().set(_input, offset)
      }

      // to entity initial
      if (e.key === 'ArrowUp') {
        entity.base().onUpCursor(props.entity)
      } else if (e.key === 'ArrowDown') {
        entity.base().onDownCursor(props.entity)
      }

      return
    }
    // delete in empty raw or convert
    if ((e.key === 'Delete' || e.key === 'Backspace') && start) {
      e.preventDefault()
      e.stopPropagation()

      entity.base().onDeleteRaw({
        index: _index.value,
        data: data.value,
        entity: props.entity,
      })

      if (_index.value <= 1) return

      if (entity.utils().isFixed(_index.value - 1)) return

      entity.base().onDelete(props.entity, _index.value)

      await nextTick

      emitter.emit('entity-edit-reset')

      await nextTick

      emitter.emit('entity-open', {
        entity: props.entity,
        up: true,
        cursor: true,
      })
    } else if (e.key === 'ArrowUp') {
      // to top
      if (start) {
        if (
          props.entity.type === 'heading-one' ||
          entity.utils().isFixed(_index.value - 1)
        )
          return

        emitter.emit('entity-edit-save')

        await nextTick

        emitter.emit('entity-open', { entity: props.entity, up: true })
      }
    } else if (e.key === 'ArrowDown') {
      // to bottom
      if (end) {
        if (_index.value + 1 === CONTEXT.entities.length) {
          emitter.emit('entity-input-focus')
          return
        }

        if (entity.utils().isFixed(_index.value + 1)) return

        emitter.emit('entity-edit-save')

        await nextTick

        emitter.emit('entity-open', { entity: props.entity, up: false })
      }
    }
  }

  const onClickInEntity = async (e: MouseEvent) => {
    onStopEvents(e)

    if (entity.utils().isFixed(_index.value)) return

    edit.value = true

    await nextTick

    input.value?.focus()
  }

  const onStopEvents = (e?: Event) => {
    e?.stopPropagation()
    e?.preventDefault()
  }

  const onClick = async () => {
    onStopEvents()

    focus.value = true

    await nextTick

    emitter.emit('entity-close', { all: true })

    await nextTick

    emitter.emit('entity-focus')
  }

  const onInput = (e: any) => {
    data.value = e.target.innerHTML
  }
</script>
