<template>
  <router-view></router-view>
  <PWAPrompt />
</template>

<script setup lang="ts">
  import { useStart } from '@/use/start'
  import { ThemePlugin } from 'better-write-plugin-theme'
  import { ImporterPlugin } from 'better-write-plugin-importer'
  import { PDFPlugin } from 'better-write-plugin-exporter-pdf'
  import { DocxPlugin } from 'better-write-plugin-exporter-docx'
  import { TxtPlugin } from 'better-write-plugin-exporter-txt'
  import { HtmlPlugin } from 'better-write-plugin-exporter-html'
  import { AnnotationsPlugin } from 'better-write-plugin-annotations'
  import { EpubPlugin } from 'better-write-plugin-exporter-epub'

  useStart([
    ThemePlugin(),
    ImporterPlugin(),
    PDFPlugin(),
    DocxPlugin(),
    EpubPlugin(),
    TxtPlugin(),
    HtmlPlugin(),
    AnnotationsPlugin(),
  ]).init()
</script>
