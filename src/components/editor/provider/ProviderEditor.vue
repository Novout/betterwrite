<template>
  <teleport to="body">
    <EditorShortcutsSwitcher v-if="ABSOLUTE.shortcuts.switcher" />
    <EditorShortcutsFinder v-else-if="ABSOLUTE.shortcuts.finder" />
    <EditorEntityComment v-else-if="ABSOLUTE.entity.comment" />
    <ProviderLogger v-else-if="ABSOLUTE.logger" />
    <ProviderProjectCreate v-else-if="ABSOLUTE.project.new" />
    <ProviderProjectPreferences v-else-if="ABSOLUTE.project.preferences" />
    <ProviderPDFConfiguration v-else-if="ABSOLUTE.pdf.configuration" />
    <ProviderPDFPreview v-else-if="ABSOLUTE.pdf.preview" />
  </teleport>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'

  const ABSOLUTE = useAbsoluteStore()
</script>
