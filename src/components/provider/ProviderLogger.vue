<template>
  <div
    id="logger-absolute"
    class="
      absolute
      top-1/4
      right-1/4
      transform
      duration-700
      w-96
      bg-white
      dark:bg-gray-800
      transition
      flex flex-col
      z-max
      h-80
      overflow-auto
    "
  >
    <LoggerItem v-for="(log, index) in logger" :hey="index" :log="log" />
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import { computed } from 'vue'

  const store = useStore()

  const logger = computed(() => store.state.logger.content)
</script>
