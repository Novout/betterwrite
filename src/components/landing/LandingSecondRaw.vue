<template>
  <textarea
    v-model="cmp"
    class="resize-none bg-transparent overflow-y-auto p-1 w-full h-96 break-all"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      required: true,
      type: String,
    },
  })

  const emit = defineEmits(['update:modelValue'])
  const cmp = computed({
    get() {
      return props.modelValue
    },
    set(val: any) {
      emit('update:modelValue', val)
    },
  })
</script>
