<template>
  <div
    class="absolute top-0 left-0 w-full bg-theme-logger-background flex flex-col z-max h-screen overflow-auto shadow-lg"
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
