<template>
  <section
    class="flex justify-center items-center w-full transition-all"
    @mouseenter="hover = true"
    @mouseout="hover = false"
  >
    <input
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
      @input.prevent="handler"
      @keypress.enter="enterHandler"
    />
  </section>
</template>

<script setup lang="ts">
  import { ContextStatePageContent } from '@/types/context'
  import { useFormat } from '@/use/format'
  import { ref, computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()
  const { t } = useI18n()

  const props = defineProps({
    modelValue: String,
  })

  const emit = defineEmits(['update:modelValue', 'submit', 'enter'])

  const hover = ref(false)
  const type = ref('paragraph')
  const input = ref(null as any)

  const cmp = computed({
    get() {
      return props.modelValue
    },
    set(val: any) {
      emit('update:modelValue', val)
    },
  })

  watch(cmp, (_cmp: string) => {
    if (_cmp.startsWith('/p')) {
      type.value = 'paragraph'
      cmp.value = ''
      input.value.placeholder = t('editor.text.placeholder.paragraph')
      return
    }

    if (_cmp.startsWith('/h1')) {
      if (store.state.context.onlyHeadingOne && type.value) return

      type.value = 'heading-one'
      cmp.value = ''
      input.value.placeholder = t('editor.text.placeholder.headingone')
      return
    }

    if (_cmp.startsWith('/h2')) {
      type.value = 'heading-two'
      cmp.value = ''
      input.value.placeholder = t('editor.text.placeholder.headingtwo')
      return
    }

    if (_cmp.startsWith('/h3')) {
      type.value = 'heading-three'
      cmp.value = ''
      input.value.placeholder = t('editor.text.placeholder.headingthree')
      return
    }
  })

  const enterHandler = () => {
    const content = {
      // TODO: Hash id
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
</script>
