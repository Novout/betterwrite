<template>
  <EditorShortcutsSwitcher v-if="ABSOLUTE.shortcuts.switcher" />
  <EditorShortcutsFinder v-else-if="ABSOLUTE.shortcuts.finder" />
  <ProviderLogger v-else-if="ABSOLUTE.logger" />
  <ProviderProjectCreate v-else-if="ABSOLUTE.project.new" />
  <ProviderPDFConfiguration v-else-if="ABSOLUTE.pdf.configuration" />
  <ProviderPDFPreview v-else-if="ABSOLUTE.pdf.preview" />
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'

  const ABSOLUTE = useAbsoluteStore()
</script>
