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
  // import { EpubPlugin } from 'better-write-plugin-exporter-epub'
  import { TxtPlugin } from 'better-write-plugin-exporter-txt'
  import { HtmlPlugin } from 'better-write-plugin-exporter-html'
  import { AnnotationsPlugin } from 'better-write-plugin-annotations'
  import { ShortcutsPlugin } from 'better-write-plugin-shortcuts'
  import { VoiceTypingPlugin } from 'better-write-plugin-voice-typing'
  import { EntityHistoryPlugin } from 'better-write-plugin-entity-history'
  import { CharactersPlugin } from 'better-write-plugin-characters'  
  import { ProgressBarPlugin } from 'better-write-plugin-progress-bar'
  import { EditorWindowPlugin } from 'better-write-plugin-editor-window'
  import { LivesharePlugin } from 'better-write-plugin-liveshare'

  useStart([
    ThemePlugin(),
    ImporterPlugin(),
    PDFPlugin(),
    DocxPlugin(),
    // EpubPlugin(),
    TxtPlugin(),
    HtmlPlugin(),
    AnnotationsPlugin(),
    ShortcutsPlugin(),
    VoiceTypingPlugin(),
    EntityHistoryPlugin(),
    CharactersPlugin(),
    ProgressBarPlugin(),
    EditorWindowPlugin(),
    LivesharePlugin(),
  ]).init()
</script>
