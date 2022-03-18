<template>
  <div class="min-h-screen overflow-y-auto w-full bg-theme-background-2">
    <DashboardHeader />
    <DashboardData />
    <DashboardProjects />
  </div>
</template>

<script setup lang="ts">
  import { tryOnMounted } from '@vueuse/core'
  import { usePlugin } from 'better-write-plugin-core'

  const plugin = usePlugin()

  tryOnMounted(async () => {
    plugin.emit('plugin-theme-set')
  })
</script>
