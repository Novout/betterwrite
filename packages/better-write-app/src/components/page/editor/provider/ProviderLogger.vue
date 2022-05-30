<template>
  <div
    class="absolute wb-scroll top-0 left-0 w-full bg-theme-logger-background flex flex-col z-max h-screen overflow-auto shadow-lg p-3"
  >
    <LoggerHeader />
    <div class="flex flex-col w-full wb-text">
      <LoggerDataItem
        v-for="(log, index) in LOGGER.content"
        v-once
        :key="index"
        :log="log"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useLoggerStore } from '@/store/logger'
  import { useProject } from '@/use/project'
  import { computed } from 'vue'

  const LOGGER = useLoggerStore()

  const project = useProject()

  const entities = computed(() => project.utils().getEntities())
</script>
