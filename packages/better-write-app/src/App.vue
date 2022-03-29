<template>
  <router-view></router-view>
  <PWAPrompt />
</template>

<script setup lang="ts">
  import { onBeforeUnmount } from 'vue'
  import { useStart } from '@/use/start'
  import { useDestroy } from '@/use/destroy'
  import { LoggerPlugin } from 'better-write-plugin-logger'
  import { ThemePlugin } from 'better-write-plugin-theme'
  import { PDFPlugin } from 'better-write-plugin-pdf'
  import { DocxPlugin } from 'better-write-plugin-docx'
  import { TxtPlugin } from 'better-write-plugin-txt'

  const start = useStart()
  const destroy = useDestroy()

  start.init([
    LoggerPlugin(),
    ThemePlugin(),
    PDFPlugin(),
    DocxPlugin(),
    TxtPlugin(),
  ])

  onBeforeUnmount(async () => {
    await destroy.init()
  })
</script>
