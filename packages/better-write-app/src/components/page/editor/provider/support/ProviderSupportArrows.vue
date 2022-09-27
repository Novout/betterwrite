<template>
  <slot />
</template>

<script setup lang="ts">
  import { useMagicKeys } from '@vueuse/core'
  import { watch } from 'vue'

  const { arrowleft, arrowright, arrowup, arrowdown } = useMagicKeys()

  const emit = defineEmits(['left', 'right', 'up', 'down'])

  watch(arrowleft, (v) => {
    if (v) emit('left')
  })

  watch(arrowright, (v) => {
    if (v) emit('right')
  })

  watch(arrowup, (v) => {
    if (v) emit('up')
  })

  watch(arrowdown, (v) => {
    if (v) emit('down')
  })
</script>
