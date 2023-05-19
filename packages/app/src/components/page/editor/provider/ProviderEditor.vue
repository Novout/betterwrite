<template>
  <teleport to="body">
    <EditorProjectNew v-if="ABSOLUTE.project.new" />
    <EditorTutorial v-else-if="ABSOLUTE.project.tutorial" />
    <EditorDevCMD v-else-if="ABSOLUTE.cmd" />
    <EditorAuthLogin v-else-if="ABSOLUTE.auth.supabase" />
    <EditorEntityDefaultOptions v-else-if="ABSOLUTE.entity.menu" />
    <EditorEntityDefaultComment v-else-if="ABSOLUTE.entity.comment" />
    <EditorEntityDefaultCustomize v-else-if="ABSOLUTE.entity.customize" />
    <EditorPagesDrafts v-else-if="ABSOLUTE.pages.drafts" />
    <EditorProjectStatistics v-else-if="ABSOLUTE.project.statistics" />
    <EditorProjectInsertions v-else-if="ABSOLUTE.project.insertions" />
    <EditorProjectCorrector v-else-if="ABSOLUTE.project.corrector" />
    <EditorProjectPreferences v-else-if="ABSOLUTE.project.preferences" />
    <EditorProjectPresenceCreate
      v-else-if="ABSOLUTE.modal.presence.createOrJoin"
    />
    <EditorProjectPresenceInformation
      v-else-if="ABSOLUTE.modal.presence.info"
    />
    <DOCXConfiguration v-else-if="ABSOLUTE.docx.configuration" />
    <PDFConfiguration v-else-if="ABSOLUTE.pdf.configuration" />
    <PDFGenerate v-else-if="ABSOLUTE.pdf.generate" />
    <EditorGeneratorSubstitutions
      v-else-if="ABSOLUTE.generator.substitutions"
    />
    <EditorToolsSwitcher v-else-if="ABSOLUTE.shortcuts.switcher" />
    <EditorToolsFinder v-else-if="ABSOLUTE.shortcuts.finder" />
    <EditorToolsSpeechRecognition
      v-else-if="ABSOLUTE.tools.speechRecognition"
    />
    <EditorSchemasCreate
      v-else-if="ABSOLUTE.schemas.create"
    />
    <EditorSchemasTemplate
      v-else-if="ABSOLUTE.schemas.template && PROJECT.schemas.length === 0"
    />
    <EditorAbsoluteLoader v-else-if="ABSOLUTE.spinner" />
  </teleport>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
</script>
