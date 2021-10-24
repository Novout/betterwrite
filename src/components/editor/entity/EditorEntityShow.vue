<template>
  <section
    class="w-full relative px-14"
    :class="
      edit && style.entity.shadow
        ? 'shadow-winset dark:shadow-binset p-0 m-0'
        : ''
    "
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="onClickInEntity"
  >
    <EditorEntityShowPopover
      v-if="
        (edit && props.entity.type !== 'heading-one') ||
        (entity.utils().isFixed(_index) && hover)
      "
      :entity="props.entity"
    />
    <div
      v-if="!edit"
      ref="show"
      class="overflow-hidden w-full break-words"
      :style="{ minHeight: '24px', whiteSpace: 'break-spaces' }"
      :class="[
        props.entity.type === 'paragraph' && !edit
          ? style.paragraph.indent
          : '',
        props.entity.type === 'paragraph' ? 'text-justify' : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontSize : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontFamily : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontColor : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontWeight : '',

        props.entity.type === 'heading-one' ? 'text-center pb-10 pt-10' : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontSize : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontFamily : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontColor : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontWeight : '',

        props.entity.type === 'heading-two' ? 'text-center pb-3 pt-8' : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontSize : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontFamily : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontColor : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontWeight : '',

        props.entity.type === 'heading-three' ? 'text-center pb-2 pt-5' : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontSize
          : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontFamily
          : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontColor
          : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontWeight
          : '',

        props.entity.type === 'page-break'
          ? 'cursor-default my-4 border-b-8 border-gray-400 dark:border-gray-900'
          : '',

        props.entity.type === 'line-break'
          ? 'cursor-default my-4 border-b-8 border-dashed border-gray-400 dark:border-gray-800'
          : '',

        props.entity.raw === env.emptyLine() ? 'cursor-default py-2' : '',
      ]"
      @click="onEdit"
      v-html="raw.convert(props.entity)"
    />
    <section v-if="commands" class="absolute z-max left-40 -top-60">
      <EditorCommands />
    </section>
    <textarea
      v-if="edit"
      ref="input"
      v-model="data"
      :placeholder="t('editor.text.placeholder.base')"
      :class="[
        props.entity.type === 'paragraph' ? 'text-justify indent-15' : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontSize : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontFamily : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontColor : '',
        props.entity.type === 'paragraph' ? style.paragraph.fontWeight : '',

        props.entity.type === 'heading-one' ? 'text-center pb-10 pt-10' : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontSize : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontFamily : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontColor : '',
        props.entity.type === 'heading-one' ? style.heading.one.fontWeight : '',

        props.entity.type === 'heading-two' ? 'text-center pb-3 pt-8' : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontSize : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontFamily : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontColor : '',
        props.entity.type === 'heading-two' ? style.heading.two.fontWeight : '',

        props.entity.type === 'heading-three' ? 'text-center pb-2 pt-5' : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontSize
          : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontFamily
          : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontColor
          : '',
        props.entity.type === 'heading-three'
          ? style.heading.three.fontWeight
          : '',
      ]"
      class="
        w-full
        text-sm
        bg-transparent
        dark:text-gray-100
        text-black
        resize-none
        overflow-hidden
        block
        break-words
      "
      :style="{ height, whiteSpace: 'break-spaces' }"
      @keypress.enter.prevent="onEnter"
      @keydown="onKeyboard"
      @input="onChangeArea"
      @click="onClick"
    />
  </section>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick, computed, onMounted } from 'vue'
  import { useRaw } from '@/use/raw'
  import useEmitter from '@/use/emitter'
  import { useInput } from '@/use/input'
  import { useEnv } from '@/use/env'
  import { useEntity } from '@/use/entity'
  import { useFactory } from '@/use/factory'
  import { useToast } from 'vue-toastification'
  import { useI18n } from 'vue-i18n'
  import { Entity } from '@/types/context'
  import { EntityShowEditOptions } from '@/types/entity'
  import { VueEmitterEntityOpen, VueEmitterEntityClose } from '@/types/emitter'
  import { useScroll } from '@/use/scroll'
  import { useContextStore } from '@/store/context'
  import { useProjectStore } from '@/store/project'
  import { useEditorStore } from '@/store/editor'
  import { useAbsoluteStore } from '@/store/absolute'

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

  const hover = ref<boolean>(false)
  const focus = ref<boolean>(false)
  const edit = ref<boolean>(false)
  const keyboard = ref<boolean>(false)
  const commands = ref<boolean>(false)

  const data = ref<string>('')
  const show = ref<HTMLDivElement | null>(null)
  const input = ref<HTMLTextAreaElement | null>(null)
  const height = ref<string>('0px')

  const style = computed(() => EDITOR.styles.show)
  const _index = computed(() => CONTEXT.entities.indexOf(props.entity))

  watch(hover, async (_hover) => {
    keyboard.value = false

    await nextTick
    if (_hover) {
      onEdit()
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

  watch(data, async (_data: string) => {
    if (_data === env.emptyLine()) {
      data.value = ''
    }

    data.value = data.value.replace(/\n/g, '')

    if (data.value.startsWith('/') && data.value.length <= 2) {
      scroll.to(`#entity-${_index.value}`, 'center')
      commands.value = true
    } else {
      commands.value = false
    }

    if (entity.utils().entry(_data, 'h2')) {
      data.value = ''

      CONTEXT.newInExistentEntity({
        old: props.entity,
        new: factory.entity().create('heading-two'),
      })
    }

    if (entity.utils().entry(_data, 'h3')) {
      data.value = ''

      CONTEXT.newInExistentEntity({
        old: props.entity,
        new: factory.entity().create('heading-three'),
      })
    }

    if (entity.utils().entry(_data, 'bp')) {
      data.value = ''

      CONTEXT.newInExistentEntity({
        old: props.entity,
        new: factory.entity().create('heading-three'),
      })

      await nextTick

      emitter.emit('entity-not-mutate', props.entity)
    }

    if (entity.utils().entry(_data, 'lb')) {
      data.value = ''

      CONTEXT.newInExistentEntity({
        old: props.entity,
        new: factory.entity().create('line-break'),
      })

      await nextTick

      emitter.emit('entity-not-mutate', props.entity)
    }

    if (entity.utils().entry(_data, 'im')) {
      data.value = ''

      factory.simulate().file(
        (content: Entity) => {
          edit.value = false

          CONTEXT.newInExistentEntity({
            old: props.entity,
            new: content,
          })
        },
        (err: any) => {
          toast.error(t('toast.generics.error'))
        }
      )
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

        onChangeArea()
      }
    )

    emitter.on('entity-open', async (payload: VueEmitterEntityOpen) => {
      const index = CONTEXT.entities.indexOf(payload.entity)

      if (payload?.up && CONTEXT.entities[index - 1] === props.entity) {
        onEdit(undefined, {
          keyboard: true,
          selectionInitial: payload?.selectionInitial,
          switch: payload?.switch,
        })
      }

      if (!payload?.up && CONTEXT.entities[index + 1] === props.entity) {
        onEdit(undefined, {
          keyboard: true,
          selectionInitial: payload?.selectionInitial,
          switch: payload?.switch,
        })
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

      await nextTick

      if (CONTEXT.entities[_id - 1] === props.entity) {
        onEdit()
      }
    })

    emitter.on('project-save', () => {
      emitter.emit('entity-close', { all: true })
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
    onChangeEdit()

    if (
      props.entity.type === 'page-break' ||
      props.entity.type === 'line-break' ||
      props.entity.type === 'image'
    ) {
      emitter.emit('entity-close', { all: true })
      return
    }

    if (options?.keyboard) {
      keyboard.value = true
      emitter.emit('entity-focus')
    }

    await nextTick

    edit.value = true

    await nextTick

    if (options?.switch) {
      onChangeArea()
    }

    if (options?.selectionInitial) {
      setTimeout(() => {
        if (!input.value) return
        input.value.selectionEnd = 0
      }, 0)
    }
  }

  const onEnter = async () => {
    const _input = input.value as HTMLTextAreaElement
    const posRaw = data.value.slice(_input.selectionStart)
    let initial = false

    if (_index.value + 1 === CONTEXT.entities.length) {
      if (_input.selectionStart === 0) {
        data.value = ''
        emitter.emit('entity-input-raw', '')
      } else {
        data.value = data.value.replace(posRaw, '')
        emitter.emit('entity-input-raw', posRaw)
      }

      emitter.emit('entity-input-focus')
      return
    }

    const end =
      _input.selectionEnd === _input.selectionStart &&
      _input.textLength === _input.selectionEnd

    if (end) {
      CONTEXT.newInPagePosEdit({
        entity: props.entity,
        type: 'paragraph',
      })
    } else {
      if (_input.selectionStart === 0) {
        CONTEXT.newInPagePosEdit({
          entity: props.entity,
          type: 'paragraph',
          raw: data.value,
        })

        data.value = env.emptyLine() as string

        initial = true
      } else {
        data.value = data.value.replace(posRaw, '')

        CONTEXT.newInPagePosEdit({
          entity: props.entity,
          type: 'paragraph',
          raw: posRaw,
        })

        initial = true
      }
    }

    await nextTick

    onUpdateContent()
    onChangeArea()

    await nextTick

    emitter.emit('entity-open', {
      entity: props.entity,
      up: false,
      keyboard: true,
      selectionInitial: initial,
    })
  }

  const onKeyboard = async (e: KeyboardEvent) => {
    const _input = input.value as HTMLTextAreaElement

    if (e.shiftKey) {
      e.preventDefault()
      e.stopPropagation()

      if (e.key === 'ArrowUp') {
        // to up
        onUpdateContent()

        await nextTick

        emitter.emit('entity-not-mutate', props.entity)

        await nextTick

        CONTEXT.switchInPage({
          entity: props.entity,
          direction: 'up',
        })

        emitter.emit('entity-close', { all: true })

        await nextTick

        emitter.emit('entity-open', {
          entity: props.entity,
          up: true,
          switch: true,
        })
      } else if (e.key === 'ArrowDown') {
        // to down
        onUpdateContent()

        await nextTick

        emitter.emit('entity-not-mutate', props.entity)

        await nextTick

        CONTEXT.switchInPage({
          entity: props.entity,
          direction: 'down',
        })

        emitter.emit('entity-close', { all: true })

        await nextTick

        emitter.emit('entity-open', {
          entity: props.entity,
          up: false,
          switch: true,
        })
      }

      return
    }

    // in ctrl press
    if (e.ctrlKey) {
      // generics
      if (e.key !== 'c' && e.key !== 'f' && e.key !== 'a' && e.key !== 'v') {
        e.preventDefault()
        e.stopPropagation()
      }

      // finder
      if (e.key === 'f') {
        ABSOLUTE.shortcuts.finder = !ABSOLUTE.shortcuts.finder
      }

      // swapper
      if (e.key === 'h') {
        ABSOLUTE.shortcuts.finder = !ABSOLUTE.shortcuts.switcher
      }

      // delete entity
      if (e.key === 'd') {
        emitter.emit('entity-not-mutate', props.entity)

        await nextTick

        CONTEXT.removeInPage(props.entity)

        await nextTick

        PROJECT.updateContext(CONTEXT.$state)
      }

      // to entity initial
      if (e.key === 'ArrowUp') {
        emitter.emit('entity-close', { all: true })

        await nextTick

        emitter.emit('entity-open', {
          entity: props.entity,
          up: true,
          selectionInitial: true,
        })
      } else if (e.key === 'ArrowDown') {
        emitter.emit('entity-close', { all: true })

        await nextTick

        emitter.emit('entity-open', {
          entity: props.entity,
          up: false,
          selectionInitial: true,
        })
      }
    } else {
      // delete in empty raw or convert
      if (
        (e.key === 'Delete' || e.key === 'Backspace') &&
        _input.selectionStart === 0
      ) {
        e.preventDefault()
        e.stopPropagation()

        if (_index.value <= 1) return

        if (entity.utils().isFixed(_index.value - 1)) return

        if (data.value !== '') {
          CONTEXT.insertRawInExistentEntity(props.entity)
        }

        emitter.emit('entity-not-mutate', props.entity)

        await nextTick

        CONTEXT.removeInPage(props.entity)

        await nextTick

        PROJECT.updateContext(CONTEXT.$state)

        await nextTick

        emitter.emit('entity-open', { entity: props.entity, up: true })
      } else if (e.key === 'ArrowUp') {
        // swap top
        if (_input.selectionStart === 0) {
          if (props.entity.type === 'heading-one') return

          if (entity.utils().isFixed(_index.value - 1)) return

          emitter.emit('entity-close', { all: true })

          await nextTick

          emitter.emit('entity-open', { entity: props.entity, up: true })
        }
      } else if (e.key === 'ArrowDown') {
        // swap bottom
        if (_input.selectionStart === _input.textLength) {
          if (_index.value + 1 === CONTEXT.entities.length) {
            emitter.emit('entity-input-focus')
            return
          }

          if (entity.utils().isFixed(_index.value + 1)) return

          emitter.emit('entity-close', { all: true })

          await nextTick

          emitter.emit('entity-open', { entity: props.entity, up: false })
        }
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
    const el = input.value as HTMLTextAreaElement

    if (el) {
      if (el.selectionEnd - el.selectionStart !== 0) {
        EDITOR.setTextSelection({
          content: data.value.substring(el.selectionStart, el.selectionEnd),
          end: el.selectionEnd,
          start: el.selectionStart,
        })
      }
    }

    e?.stopPropagation()
    e?.preventDefault()
  }

  const onChangeArea = () => {
    useInput().expandTextArea(input.value as HTMLTextAreaElement)

    onChangeEdit()
  }

  const onChangeEdit = () => {
    if (!edit.value)
      height.value = (show.value as HTMLDivElement)?.offsetHeight + 'px'
  }

  const onClick = async () => {
    onStopEvents()
    onChangeArea()

    focus.value = true
    keyboard.value = false

    emitter.emit('entity-focus')
  }
</script>
