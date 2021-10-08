<template>
  <EditorShortcutsSwitcher v-if="absolute.shortcuts.switcher" />
  <EditorShortcutsFinder v-if="absolute.shortcuts.finder" />
  <ProviderLogger v-if="absolute.logger" />
  <ProviderPDFConfiguration v-if="absolute.pdf.configuration" />
  <ProviderPDFPreview v-if="absolute.pdf.preview" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const absolute = computed(() => store.state.absolute)
</script>
