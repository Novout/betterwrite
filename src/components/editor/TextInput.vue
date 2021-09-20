<template>
  <section @mouseenter="hover = true" @mouseout="hover = false" class="flex justify-center items-center w-full transition-all">
    <input
      v-model="cmp"
      class="flex-1 border-none shadow-2xl p-1"
      :class="[hover ? 'bg-gray-800 bg-opacity-10' : 'bg-transparent', store.state.editor.styles.input.fontSize, store.state.editor.styles.input.fontFamily, store.state.editor.styles.input.fontColor]"
      type="text"
      @input.prevent="handler"
      @keypress.enter="enterHandler"
      :placeholder="t('editor.text.inputCode')"
    />
  </section>

</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()
  const { t } = useI18n()

  const props = defineProps({
    modelValue: String,
  })

  const emit = defineEmits(['update:modelValue', 'submit', 'enter'])

  const hover = ref(false)
  const cmp = computed({
    get() {
      return props.modelValue
    },
    set(val: any) {
      emit('update:modelValue', val)
    },
  })

  const enterHandler = () => {
    emit('enter')
  }

  const handler = () => {
    emit('submit')
  }
</script>
