<template>
  <div
    ref="absolute"
    v-motion
    v-provider-close
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    :esc="
      () => {
        emit('close')
      }
    "
    class="fixed left-0 top-0 w-full h-screen bg-theme-transparent z-200"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['close'])
</script>
