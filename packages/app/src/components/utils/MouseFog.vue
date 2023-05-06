<template>
  <div
    :style="{
      left: `${x - 120}px`,
      top: `${y - 120}px`,
      backgroundColor: '#AAA',
      opacity: 0.075,
    }"
    class="absolute shadow-xl w-60 h-60 rounded-full pointer-events-none z-999 filter blur-xl"
  />
</template>

<script setup lang="ts">
  import { useMouse } from '@vueuse/core'

  const { x, y } = useMouse()
</script>
