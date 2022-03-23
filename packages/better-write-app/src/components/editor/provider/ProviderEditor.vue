<template>
  <teleport to="body">
    <EditorAuthLogin v-if="ABSOLUTE.auth.supabase" />
    <EditorEntityDefaultOptions v-else-if="ABSOLUTE.entity.menu" />
    <EditorShortcutsSwitcher v-else-if="ABSOLUTE.shortcuts.switcher" />
    <EditorShortcutsFinder v-else-if="ABSOLUTE.shortcuts.finder" />
    <EditorEntityDefaultComment v-else-if="ABSOLUTE.entity.comment" />
    <EditorEntityDefaultCustomize v-else-if="ABSOLUTE.entity.customize" />
    <EditorPagesDrafts v-else-if="ABSOLUTE.pages.drafts" />
    <ProviderLogger v-else-if="ABSOLUTE.logger" />
    <ProviderProjectCreate v-else-if="ABSOLUTE.project.new" />
    <EditorProjectStatistics v-else-if="ABSOLUTE.project.statistics" />
    <EditorProjectCorrector v-else-if="ABSOLUTE.project.corrector" />
    <ProviderProjectPreferences v-else-if="ABSOLUTE.project.preferences" />
    <ProviderPDFConfiguration v-else-if="ABSOLUTE.pdf.configuration" />
    <ProviderPDFPreview v-else-if="ABSOLUTE.pdf.preview" />
    <ProviderPDFGenerate v-else-if="ABSOLUTE.pdf.generate" />

    <EditorToolsSpeechRecognition v-if="ABSOLUTE.tools.speechRecognition" />
  </teleport>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'

  const ABSOLUTE = useAbsoluteStore()
</script>
