<template>
  <input v-model="cmp" type="color" name="head" />
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
