<template>
  <section
    class="flex justify-center items-center w-full"
    @mouseenter="hover = true"
    @mouseout="hover = false"
  >
    <input
      id="main-input-define"
      ref="input"
      v-model="cmp"
      class="flex-1 rounded-none border-none shadow-2xl p-1"
      :class="[
        hover
          ? 'dark:bg-gray-800 bg-gray-200 bg-opacity-90'
          : 'dark:bg-gray-700 bg-gray-100',
        store.state.editor.styles.input.fontSize,
        store.state.editor.styles.input.fontFamily,
        store.state.editor.styles.input.fontColor,
      ]"
      type="text"
      :placeholder="t('editor.text.placeholder.base')"
      @input="handler"
      @keypress.enter="enterHandler"
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

  const hover = ref<boolean>(false)
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
    paste.value = true
    emit('reset')

    const data = useInput().pasteText(event)

    data.forEach((raw: string) => {
      const content = {
        id: store.state.context.totalEntityCreated,
        type: 'paragraph',
        raw,
        createdAt: useFormat().actually(),
        updatedAt: useFormat().actually(),
      } as ContextStatePageContent

      emit('enter', content)
    })
  }
</script>
