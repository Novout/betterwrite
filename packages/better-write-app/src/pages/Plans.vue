<template>
  <main class="min-h-screen overflow-y-auto w-full bg-theme-background-2">
    <div
      v-motion
      :initial="{ opacity: 0, x: -20 }"
      :enter="{ opacity: 1, x: 0, transition: { delay: 0 } }"
      class="w-full md:w-52 my-2 ml-0 md:ml-5"
    >
      <Logo :back="true" :width="30" />
    </div>
    <PlansContent
      v-motion
      :initial="{ opacity: 0, y: -50 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
    />
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
