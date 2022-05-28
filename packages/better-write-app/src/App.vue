<template>
  <router-view></router-view>
  <PWAPrompt />
</template>

<script setup lang="ts">
  import { useStart } from '@/use/start'
  import { LoggerPlugin } from 'better-write-plugin-logger'
  import { ThemePlugin } from 'better-write-plugin-theme'
  import { ImporterPlugin } from 'better-write-plugin-importer'
  import { PDFPlugin } from 'better-write-plugin-pdf'
  import { DocxPlugin } from 'better-write-plugin-docx'
  import { TxtPlugin } from 'better-write-plugin-txt'
  import { MultiplayerPlugin } from 'better-write-plugin-multiplayer'

  const start = useStart()

  start.init([
    LoggerPlugin(),
    ThemePlugin(),
    ImporterPlugin(),
    PDFPlugin(),
    DocxPlugin(),
    TxtPlugin(),
    MultiplayerPlugin(),
  ])
</script>
