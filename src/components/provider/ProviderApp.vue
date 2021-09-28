<template>
  <EditorCommands v-if="store.state.absolute.commands" />
  <EditorShortcutsSwitcher v-if="store.state.absolute.shortcuts.switcher" />
  <ProviderLoad v-if="store.state.absolute.load" />
  <ProviderLogger v-if="store.state.absolute.logger" />
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'

  const store = useStore()
</script>
