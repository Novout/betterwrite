<template>
  <section
    class="flex justify-center items-center w-full transition-all"
    @mouseenter="hover = true"
    @mouseout="hover = false"
  >
    <input
      v-model="cmp"
      class="flex-1 rounded-none border-none shadow-2xl p-1"
      :class="[
        hover ? 'bg-gray-800 bg-opacity-90' : 'bg-gray-800 bg-opacity-96',
        store.state.editor.styles.input.fontSize,
        store.state.editor.styles.input.fontFamily,
        store.state.editor.styles.input.fontColor,
      ]"
      type="text"
      :placeholder="t('editor.text.inputCode')"
      @input.prevent="handler"
      @keypress.enter="enterHandler"
    />
  </section>
</template>

<script setup lang="ts">
  import { ContextStatePageContent } from '@/types/context'
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
      return
    }

    if (_cmp.startsWith('/h1')) {
      type.value = 'heading-one'
      cmp.value = ''
      return
    }

    if (_cmp.startsWith('/h2')) {
      type.value = 'heading-two'
      cmp.value = ''
      return
    }

    if (_cmp.startsWith('/h3')) {
      type.value = 'heading-three'
      cmp.value = ''
      return
    }
  })

  const enterHandler = () => {
    const content = {
      id: store.state.context.entity,
      type: type.value,
      raw: props.modelValue,
    } as ContextStatePageContent

    type.value = 'paragraph'

    emit('enter', content)
  }
  const handler = () => {
    emit('submit')
  }
</script>
