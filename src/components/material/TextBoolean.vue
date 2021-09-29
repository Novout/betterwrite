<template>
  <input ref="inp" v-model="cmp" type="checkbox" :class="css" />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const props = defineProps({
    modelValue: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
    css: {
      required: false,
      type: String,
    },
  })

  const emit = defineEmits(['update:modelValue'])
  const inp = ref<HTMLElement | null>(null as any)
  const cmp = computed({
    get() {
      return props.modelValue
    },
    set(val: any) {
      emit('update:modelValue', val)
    },
  })
</script>
