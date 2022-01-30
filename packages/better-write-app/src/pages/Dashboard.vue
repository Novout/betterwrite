<template>
  <div class="min-h-screen overflow-y-auto w-full bg-theme-background-1">
    <DashboardHeader />
    <DashboardNew />
    <DashboardProjects v-if="AUTH.account.user" />
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'

  const AUTH = useAuthStore()
</script>
