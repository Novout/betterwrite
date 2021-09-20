<template>
  <textarea
    v-model="cmp"
    class="w-full border-none"
    type="text"
    @input.prevent="handler"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: String,
  })

  const emit = defineEmits(['update:modelValue', 'submit'])

  const cmp = computed({
    get() {
      return props.modelValue
    },
    set(val: any) {
      emit('update:modelValue', val)
    },
  })

  const handler = () => {
    emit('submit')
  }
</script>
