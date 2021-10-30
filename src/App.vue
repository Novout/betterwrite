<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
  import { onBeforeUnmount } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStart } from '@/use/start'
  import { useDestroy } from '@/use/destroy'
  import { LoggerPlugin } from './plugin/logger'

  const start = useStart()
  const destroy = useDestroy()

  start.init([LoggerPlugin()])

  onBeforeUnmount(async () => {
    await destroy.init()
  })
</script>
