<template>
  <div
    id="logger-absolute"
    class="
      absolute
      top-1/2
      left-1/2
      transform
      -translate-x-1/2 -translate-y-1/2
      overflow-y-auto
      duration-700
      md:w-1/2 md:h-1/2
      w-full
      h-screen
      bg-white
      dark:bg-gray-800
      transition
      flex flex-col
      z-max
    "
  >
    <PDFConfiguration />
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import { computed } from 'vue'

  const store = useStore()

  const logger = computed(() => store.state.logger.content)
</script>
