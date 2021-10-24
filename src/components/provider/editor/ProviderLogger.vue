<template>
  <div
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
      shadow-lg
    "
  >
    <LoggerHeader />
    <div id="logger-absolute" class="flex flex-col overflow-y-auto">
      <LoggerItem
        v-for="(log, index) in LOGGER.content"
        :key="index"
        :log="log"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useLoggerStore } from '@/store/logger'

  const LOGGER = useLoggerStore()
</script>
