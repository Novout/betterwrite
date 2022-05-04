<template>
  <section v-if="false" class="absolute z-max left-40 -top-60">
    <EditorCommands />
  </section>
  <div class="relative w-full">
    <p
      ref="__INPUT__"
      :class="!isAttached ? 'indent-8' : ''"
      class="editable whitespace-pre-line text-justify text-theme-editor-entity-text hover:text-theme-editor-entity-text-hover active:text-theme-editor-entity-text-active"
      :spellcheck="true"
      :contenteditable="true"
      :data-placeholder="
        focused
          ? t('editor.text.placeholder.base', {
              prefix: EDITOR.configuration.commands.prefix,
            })
          : ''
      "
      @input="onInput"
      @keydown="onKeyboard"
      @keypress.enter="onEnter"
      v-html="raw.v2().purge().editor(props.entity)"
    />
  </div>
</template>

<script setup lang="ts">
  import { useEntity } from '@/use/entity'
  import { useBlockText } from '@/use/block/text'
  import { useEditorStore } from '@/store/editor'
  import { ref, computed, watch, nextTick, onMounted } from 'vue'
  import { useFocus } from '@vueuse/core'
  import { useI18n } from 'vue-i18n'
  import { useContextStore } from '@/store/context'
  import { Entity } from 'better-write-types'
  import { useRaw } from '@/use/raw'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProject } from '@/use/project'
  import useEmitter from '@/use/emitter'
  import { useUtils } from '@/use/utils'
  import { useFactory } from '@/use/factory'
  import { useStorage } from '@/use/storage/storage'

  const props = defineProps<{
    entity: Entity
    isAttached: boolean
  }>()

  const EDITOR = useEditorStore()
  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()

  const __INPUT__ = ref()
  const isSalvageable = ref(false)
  const { t } = useI18n()
  const project = useProject()
  const block = useBlockText()
  const entity = useEntity()
  const emitter = useEmitter()
  const raw = useRaw()
  const utils = useUtils()
  const factory = useFactory()
  const storage = useStorage()

  const _index = computed(() => CONTEXT.entities.indexOf(props.entity))

  const { focused } = useFocus(__INPUT__)

  /* speech API */
  watch(focused, (_focused) => {
    if (_focused && !entity.utils().isFixed(_index.value)) {
      EDITOR.actives.entity.index = _index.value

      if (ABSOLUTE.tools.speechRecognition) {
        project.utils().resetAllVisual()

        CONTEXT.entities[_index.value].visual.warning = true
      }
    }

    /* save block */
    if (!_focused) {
      block.save(_index.value, __INPUT__.value.innerHTML)

      isSalvageable.value = false
    }
  })

  onMounted(() => {
    emitter.on(
      'entity-text-focus',
      async ({ target, position, positionOffset }) => {
        if (CONTEXT.entities[target] === props.entity) {
          switch (position) {
            case 'start':
              raw.v2().caret().set(__INPUT__.value, 0)
              break
            case 'end':
              raw.v2().caret().setEnd(__INPUT__.value)
              break
            case 'offset':
              raw
                .v2()
                .caret()
                .set(__INPUT__.value, positionOffset as number)
              break
            case 'auto':
              __INPUT__.value?.focus()
              break
          }
        }
      }
    )

    emitter.on('entity-text-force-save', () => {
      if (isSalvageable.value && __INPUT__.value && __INPUT__.value.innerHTML) {
        block.save(_index.value, __INPUT__.value.innerHTML)

        isSalvageable.value = false
      }
    })
  })

  const setData = (val: string) => {
    __INPUT__.value.innerHTML = val
  }

  const onInput = () => {
    isSalvageable.value = true

    const parse = raw.v2().block().text().parse(__INPUT__.value.innerHTML)

    console.log(raw.v2().block().text().join(parse))
  }

  const onKeyboard = async (e: KeyboardEvent) => {
    const _input = __INPUT__.value as HTMLDivElement

    const value = raw.v2().caret().value(_input)
    // const position = raw.v2().caret().index(_input)
    const end = raw.v2().caret().end(_input)
    const start = raw.v2().caret().start(_input)
    // const empty = raw.v2().caret().empty(_input)
    const offset = utils.cursor().getCurrentCursorPosition(_input)

    if (e.shiftKey) {
      if (e.key === 'ArrowUp') {
        // to up
        e.preventDefault()
        e.stopPropagation()

        entity.base().onUp(props.entity, _index.value)
      } else if (e.key === 'ArrowDown') {
        // to down
        e.preventDefault()
        e.stopPropagation()

        entity.base().onDown(props.entity, _index.value)
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

        entity.base().onDelete(props.entity, _index.value)
      }

      // italic entity
      if (e.key === 'i' || e.key === 'I') {
        if (!value || props.entity.type !== 'paragraph') return

        e.preventDefault()
        e.stopPropagation()

        setData(
          raw.v2().apply({
            existent: __INPUT__.value.innerHTML,
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
            existent: __INPUT__.value.innerHTML,
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

        // entity.base().onUpCursor(props.entity)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        e.stopPropagation()

        // entity.base().onDownCursor(props.entity)
      }

      return
    }
    // delete in empty raw or convert
    if ((e.key === 'Delete' || e.key === 'Backspace') && start) {
      e.preventDefault()
      e.stopPropagation()

      entity.base().onDeleteRaw({
        index: _index.value,
        data: __INPUT__.value.innerHTML,
        entity: props.entity,
      })

      if (_index.value <= 1) return

      if (entity.utils().isFixed(_index.value - 1)) return

      entity.base().onDelete(props.entity, _index.value)
    } else if (e.key === 'ArrowUp') {
      // to top
      if (start) {
        if (
          props.entity.type === 'heading-one' ||
          entity.utils().isFixed(_index.value - 1)
        )
          return
      }
    } else if (e.key === 'ArrowDown') {
      // to bottom
      if (end) {
        if (entity.utils().isFixed(_index.value + 1)) return
      }
    }
  }

  const onEnter = async (e: KeyboardEvent) => {
    if (props.isAttached) {
      e.preventDefault()
      e.stopPropagation()

      const item = factory.entity().create(props.entity.type)
      const index = _index.value + 1

      CONTEXT.insert(item, index)

      await nextTick

      await storage.normalize()

      await nextTick

      emitter.emit('entity-text-focus', {
        position: 'auto',
        target: index,
      })
    }
  }
</script>
