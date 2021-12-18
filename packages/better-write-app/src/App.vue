<template>
  <router-view></router-view>
  <PWAPrompt />
</template>

<script setup lang="ts">
  import { onBeforeUnmount } from 'vue'
  import { useStart } from '@/use/start'
  import { useDestroy } from '@/use/destroy'
  import { LoggerPlugin } from './plugin/logger'
  import { ThemePlugin } from './plugin/theme'

  const start = useStart()
  const destroy = useDestroy()

  start.init([LoggerPlugin(), ThemePlugin()])

  onBeforeUnmount(async () => {
    await destroy.init()
  })
</script>
