<template>
  <teleport to="body">
    <EditorDevCMD v-if="ABSOLUTE.cmd" />
    <EditorAuthLogin v-if="ABSOLUTE.auth.supabase" />
    <EditorEntityDefaultOptions v-else-if="ABSOLUTE.entity.menu" />
    <EditorEntityDefaultComment v-else-if="ABSOLUTE.entity.comment" />
    <EditorEntityDefaultCustomize v-else-if="ABSOLUTE.entity.customize" />
    <EditorPagesDrafts v-else-if="ABSOLUTE.pages.drafts" />
    <ProviderProjectCreate v-else-if="ABSOLUTE.project.new" />
    <EditorProjectStatistics v-else-if="ABSOLUTE.project.statistics" />
    <EditorProjectCorrector v-else-if="ABSOLUTE.project.corrector" />
    <ProviderProjectPreferences v-else-if="ABSOLUTE.project.preferences" />
    <ProviderDOCXConfiguration v-else-if="ABSOLUTE.docx.configuration" />
    <ProviderPDFConfiguration v-else-if="ABSOLUTE.pdf.configuration" />
    <ProviderPDFGenerate v-else-if="ABSOLUTE.pdf.generate" />
    <EditorGeneratorSubstitutions v-if="ABSOLUTE.generator.substitutions" />
    <EditorToolsSwitcher v-else-if="ABSOLUTE.shortcuts.switcher" />
    <EditorToolsFinder v-else-if="ABSOLUTE.shortcuts.finder" />
    <EditorToolsSpeechRecognition v-if="ABSOLUTE.tools.speechRecognition" />
    <EditorLiveCreate v-else-if="ABSOLUTE.live.create" />
    <EditorLiveEnter v-else-if="ABSOLUTE.live.enter" />
    <EditorAbsoluteLoader v-else-if="ABSOLUTE.spinner" />
  </teleport>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'

  const ABSOLUTE = useAbsoluteStore()
</script>
