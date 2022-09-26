<template>
  <div
    ref="absolute"
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    class="fixed left-0 top-0 w-full h-screen bg-theme-transparent z-200"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { useMagicKeys } from '@vueuse/core'
  import { ref, watch } from 'vue'

  const absolute = ref<HTMLElement | null>(null)

  const { escape } = useMagicKeys()

  const emit = defineEmits(['close'])

  watch(escape, (v) => {
    if (v) emit('close')
  })
</script>
