<template>
  <div class="wb-screen w-full bg-theme-editor-dashboard-background-main">
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
