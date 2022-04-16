<template>
  <div
    class="absolute top-0 left-0 w-full bg-theme-logger-background flex flex-col z-max h-screen overflow-auto shadow-lg p-3"
  >
    <LoggerHeader />
    <div class="grid grid-cols-4 overflow-hidden wb-text">
      <div class="col-span-2 md:col-span-3 h-screen overflow-y-auto">
        <LoggerEntityItem
          v-for="(entity, index) in entities"
          v-once
          :key="index"
          :entity="entity"
        />
      </div>
      <div
        class="flex col-span-2 md:col-auto flex-col h-screen overflow-y-auto"
      >
        <LoggerDataItem
          v-for="(log, index) in LOGGER.content"
          v-once
          :key="index"
          :log="log"
        />
      </div>
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
