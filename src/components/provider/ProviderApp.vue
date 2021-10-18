<template>
  <EditorShortcutsSwitcher v-if="absolute.shortcuts.switcher" />
  <EditorShortcutsFinder v-else-if="absolute.shortcuts.finder" />
  <ProviderLogger v-else-if="absolute.logger" />
  <ProviderProjectCreate v-else-if="absolute.project.new" />
  <ProviderPDFConfiguration v-else-if="absolute.pdf.configuration" />
  <ProviderPDFPreview v-else-if="absolute.pdf.preview" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const absolute = computed(() => store.state.absolute)
</script>
