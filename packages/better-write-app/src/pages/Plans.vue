<template>
  <main class="min-h-screen overflow-y-auto w-full bg-theme-background-2">
    <div class="w-full md:w-52 my-2 ml-0 md:ml-5">
      <AsideBarLogo :back="true" :width="30" />
    </div>
    <PlansContent />
    <PlansCards />
  </main>
</template>

<script setup lang="ts">
  import { tryOnMounted } from '@vueuse/core'
  import { usePlugin } from 'better-write-plugin-core'

  const plugin = usePlugin()

  tryOnMounted(async () => {
    plugin.emit('plugin-theme-set')
  })
</script>
