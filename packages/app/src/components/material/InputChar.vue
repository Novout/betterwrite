<template>
  <input ref="inp" v-model="cmp" class="p-2 bg-theme-background-2 font-bold rounded shadow wb-text w-10 text-center" :class="css" />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const props = defineProps<{
    modelValue: string
    css?: string
  }>()

  const emit = defineEmits(['update:modelValue'])
  const inp = ref<HTMLElement | null>(null)
  const cmp = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val.substring(1, val.length - 1))
    },
  })
</script>
