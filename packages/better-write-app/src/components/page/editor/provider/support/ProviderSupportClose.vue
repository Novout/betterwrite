<template>
  <slot />
</template>

<script setup lang="ts">
  import { useMagicKeys } from '@vueuse/core'
  import { watch } from 'vue'

  const { escape } = useMagicKeys()

  const emit = defineEmits(['close'])

  watch(escape, (v) => {
    if (v) emit('close')
  })
</script>
