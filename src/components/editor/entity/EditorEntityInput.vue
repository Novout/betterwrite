<template>
  <section class="flex justify-center items-center w-full relative">
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
        dark:bg-gray-700
        bg-gray-100
      "
      :style="{ minHeight: '50px' }"
      :class="[
        store.state.editor.styles.input.fontSize,
        store.state.editor.styles.input.fontFamily,
        store.state.editor.styles.input.fontColor,
      ]"
      :placeholder="t('editor.text.placeholder.base')"
      @input="onExpandableTextareaInput"
      @keypress.enter.prevent="enterHandler"
      @paste="pasteHandler"
    />
  </section>
</template>

<script setup lang="ts">
  import { ContextStatePageContent } from '@/types/context'
  import { useEntity } from '@/use/entity'
  import { useFormat } from '@/use/format'
  import { useInput } from '@/use/input'
  import { ref, computed, watch, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()
  const { t } = useI18n()

  const props = defineProps({
    modelValue: String,
  })

  const emit = defineEmits(['update:modelValue', 'submit', 'enter', 'reset'])

  const type = ref<string>('paragraph')
  const input = ref(null as any)
  const paste = ref<boolean>(false)

  onMounted(() => {
    useInput().prevent(input.value)
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
    if (paste.value) {
      cmp.value = ''

      paste.value = false
    }

    if (_cmp.startsWith('/') && _cmp.length <= 2) {
      store.commit('absolute/commands')
    } else if (store.state.absolute.commands) {
      store.commit('absolute/commands')
    }

    if (useEntity().entry(_cmp, 'p')) {
      type.value = 'paragraph'
      cmp.value = ''
      input.value.placeholder = t('editor.text.placeholder.paragraph')
      return
    }

    if (useEntity().entry(_cmp, 'h2')) {
      type.value = 'heading-two'
      cmp.value = ''
      input.value.placeholder = t('editor.text.placeholder.headingtwo')
      return
    }

    if (useEntity().entry(_cmp, 'h3')) {
      type.value = 'heading-three'
      cmp.value = ''
      input.value.placeholder = t('editor.text.placeholder.headingthree')
      return
    }
  })

  const enterHandler = () => {
    const content = {
      id: store.state.context.totalEntityCreated,
      type: type.value,
      raw: props.modelValue,
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    } as ContextStatePageContent

    type.value = 'paragraph'
    input.value.placeholder = t('editor.text.placeholder.paragraph')

    emit('enter', content)
  }

  const handler = () => {
    emit('submit')
  }

  const pasteHandler = (event: any) => {
    if (cmp.value !== '') return

    paste.value = true
    emit('reset')

    const data = useInput().pasteText(event)

    data.forEach(async (raw: string) => {
      const content = {
        id: store.state.context.totalEntityCreated,
        type: 'paragraph',
        raw,
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as ContextStatePageContent

      store.commit('context/addInPageWithPaste', content)

      await emit('enter', content)
    })
  }

  const onExpandableTextareaInput = () => {
    const _ = useInput()
    let minRows = input.value.getAttribute('data-min-rows') | 0,
      rows
    !input.value._baseScrollHeight && _.getScrollHeight(input.value)

    input.value.rows = minRows
    rows = Math.ceil(
      (input.value.scrollHeight - input.value._baseScrollHeight) / 16
    )
    input.value.rows = minRows + rows
  }
</script>
