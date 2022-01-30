<template>
  <div class="min-h-screen overflow-y-auto w-full bg-theme-background-1">
    <DashboardHeader />
    <DashboardNew />
    <DashboardProjects v-if="AUTH.account.user" />
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'
  import { tryOnMounted } from '@vueuse/core'
  import { usePlugin } from 'better-write-plugin-core'

  const AUTH = useAuthStore()

  const plugin = usePlugin()

  tryOnMounted(() => {
    plugin.emit('plugin-theme-set')
  })
</script>
