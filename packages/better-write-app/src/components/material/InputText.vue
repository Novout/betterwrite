<template>
  <input ref="inp" v-model="cmp" :class="css" />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const props = defineProps({
    modelValue: {
      required: true,
      type: String,
    },
    css: {
      required: false,
      type: String,
    },
  })

  const emit = defineEmits(['update:modelValue'])
  const inp = ref<HTMLElement | null>(null)
  const cmp = computed({
    get() {
      return props.modelValue
    },
    set(val: any) {
      emit('update:modelValue', val)
    },
  })
</script>
