<template>
  <section class="flex justify-center items-center w-full relative">
    <section class="absolute z-50 left-40 -top-60">
      <EditorCommands v-if="commands" />
    </section>
    <textarea
      id="main-input-define"
      ref="input"
      v-model="cmp"
      data-min-rows="1"
      class="
        resize-none
        indent-15
        overflow-hidden
        w-full
        rounded-none
        border-none
        bg-theme-editor-input-background 
        hover:bg-theme-editor-input-background-hover 
        active:bg-theme-editor-input-background-active 
        text-theme-editor-input-text 
        placeholder-theme-editor-input-placeholder
        hover:theme-editor-input-text-hover 
        active:theme-editor-input-text-active
        px-4 md:px-14
      "
      :style="{ minHeight: '50px' }"
      :class="[
        EDITOR.styles.input.fontSize,
        EDITOR.styles.input.fontFamily,
        EDITOR.styles.input.fontColor,
      ]"
      :placeholder="t('editor.text.placeholder.base')"
      @input="onInput"
      @keypress.enter.prevent="enterHandler"
      @keydown="onKeyboard"
      @paste="pasteHandler"
      @focus="onSet"
      @click.prevent.stop="onClick"
    />
  </section>
</template>

<script setup lang="ts">
  import { Entity } from '@/types/context'
  import { useEntity } from '@/use/entity'
  import { useFormat } from '@/use/format'
  import { useInput } from '@/use/input'
  import { useScroll } from '@/use/scroll'
  import useEmitter from '@/use/emitter'
  import { ref, computed, watch, onMounted, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'
  import { useEnv } from '@/use/env'
  import { useFactory } from '@/use/factory'
  import { useEditorStore } from '@/store/editor'
  import { useContextStore } from '@/store/context'
  import usePlugin from '@/use/plugin/core'
import { useUtils } from '@/use/utils'

  const toast = useToast()
  const { t } = useI18n()
  const emitter = useEmitter()
  const entity = useEntity()
  const format = useFormat()
  const env = useEnv()
  const factory = useFactory()
  const plugin = usePlugin()
  const utils = useUtils()

  const EDITOR = useEditorStore()
  const CONTEXT = useContextStore()

  const props = defineProps({
    modelValue: String,
  })

  const emit = defineEmits(['update:modelValue', 'submit', 'enter', 'reset'])

  const type = ref<string>('paragraph')
  const input = ref(null as any)
  const paste = ref<boolean>(false)
  const commands = ref<boolean>(false)

  onMounted(() => {
    useInput().prevent(input.value)

    emitter.on('entity-input-focus', () => {
      input.value?.focus()

      useScroll().force('#edit')
    })

    emitter.on('entity-input-raw', (raw: string) => {
      cmp.value = raw
    })

    emitter.on('entity-input-force-enter', () => {
      enterHandler()
    })
  })

  const cmp = computed({
    get() {
      return props.modelValue
    },
    set(val: any) {
      emit('update:modelValue', val)
    },
  })

  watch(cmp, (_cmp: string) => {
    plugin.emit('plugin-input-watch-initial', {
      data: _cmp,
      index: CONTEXT.entities.length
    }) 

    if (paste.value) {
      cmp.value = ''

      paste.value = false
    }

    if (_cmp.startsWith('/') && _cmp.length <= 2) {
      commands.value = true
    } else {
      commands.value = false
    }

    if (entity.utils().entry(_cmp, 'p')) {
      type.value = 'paragraph'
      cmp.value = ''
      input.value.placeholder = t('editor.text.placeholder.paragraph')
      return
    }

    if (entity.utils().entry(_cmp, 'h2')) {
      type.value = 'heading-two'
      cmp.value = ''
      input.value.placeholder = t('editor.text.placeholder.headingtwo')
      return
    }

    if (entity.utils().entry(_cmp, 'h3')) {
      type.value = 'heading-three'
      cmp.value = ''
      input.value.placeholder = t('editor.text.placeholder.headingthree')
      return
    }

    if (entity.utils().entry(_cmp, 'bp')) {
      cmp.value = ''

      const content = {
        type: 'page-break',
        raw: env.pageBreak(),
        createdAt: format.actually(),
        updatedAt: format.actually(),
      } as Entity

      type.value = 'paragraph'
      input.value.placeholder = t('editor.text.placeholder.paragraph')

      emit('enter', content)

      return
    }

    if (entity.utils().entry(_cmp, 'lb')) {
      cmp.value = ''

      const content = {
        type: 'line-break',
        raw: env.lineBreak(),
        createdAt: format.actually(),
        updatedAt: format.actually(),
      } as Entity

      type.value = 'paragraph'
      input.value.placeholder = t('editor.text.placeholder.paragraph')

      emit('enter', content)

      return
    }

    if (entity.utils().entry(_cmp, 'im')) {
      cmp.value = ''

      factory.simulate().file((content: Entity) => {
        type.value = 'paragraph'
        input.value.placeholder = t('editor.text.placeholder.paragraph')

        emit('enter', content)

        return
      }, () => {
        toast.error(t('toast.generics.error'))
      })
    }

    plugin.emit('plugin-input-watch-last', _cmp)
  })

  const enterHandler = () => {
    if(!cmp.value) return

    const content = {
      type: type.value,
      raw: props.modelValue,
      createdAt: format.actually(),
      updatedAt: format.actually(),
    } as Entity

    type.value = 'paragraph'
    input.value.placeholder = t('editor.text.placeholder.paragraph')

    emit('enter', content)
  }

  const onSet = () => {
    emitter.emit('entity-close', {}, { all: true })
  }

  const pasteHandler = (event: any) => {
    let _plugin_quantity = 0
    if (cmp.value !== '') return

    paste.value = true
    emit('reset')

    const data = useInput().pasteText(event)

    data.forEach(async (raw: string) => {
      const normalize = raw.replace(/\s+/g, ' ').trim()

      if(!normalize) return

      const content = {
        type: type.value,
        raw: normalize,
        createdAt: format.actually(),
        updatedAt: format.actually(),
      } as Entity

      _plugin_quantity++

      await emit('enter', content)
    })

    plugin.emit('plugin-entity-paste-in-page', {
      index: CONTEXT.entities.length,
      quantity: _plugin_quantity
    })
  }

  const onKeyboard = async (e: KeyboardEvent) => {
    if(e.ctrlKey) {
      // italic entity
      if (e.key === 'i') {
        const content = entity
          .base()
          .onItalicRaw(utils.text().getSelection(cmp.value, input.value))

        const start = input.value.selectionStart
        const end = input.value.selectionEnd

        cmp.value =
          cmp.value.slice(0, start) +
          content +
          cmp.value.slice(start + content.length - 2)

        await nextTick

        if (content === '**') {
          input.value.setSelectionRange(start + 1, start + 1)
        } else {
          input.value.setSelectionRange(end + 2, end + 2)
        }
      }

      // bold entity
      if (e.key === 'b') {
        const content = entity
          .base()
          .onBoldRaw(utils.text().getSelection(cmp.value, input.value))

        const start = input.value.selectionStart
        const end = input.value.selectionEnd

        cmp.value =
          cmp.value.slice(0, start) +
          content +
          cmp.value.slice(start + content.length - 2)

        await nextTick

        if (content === '&&') {
          input.value.setSelectionRange(start + 1, start + 1)
        } else {
          input.value.setSelectionRange(end + 2, end + 2)
        }
      }

      return
    }

    if(e.key === 'ArrowUp') {
      emitter.emit('entity-open-last')
      return
    }

    if((e.key === 'Delete' || e.key === 'Backspace') && cmp.value === '') {
      e.preventDefault()
      e.stopPropagation()
      
      emitter.emit('entity-open-last')
      return
    }
  }

  const onInput = () => {
    useInput().expandTextArea(input.value)
  }

  const onClick = () => {
    emitter.emit('entity-focus')
  }
</script>
