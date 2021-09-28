<template>
  <EditorCommands v-if="store.state.absolute.commands" />
  <EditorShortcutsSwitcher v-if="store.state.absolute.shortcuts.switcher" />
  <ProviderLoad v-if="store.state.absolute.load" />
  <ProviderLogger v-if="store.state.absolute.logger" />
  <ProviderPDF v-if="store.state.absolute.pdf.configuration" />
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'

  const store = useStore()
</script>
