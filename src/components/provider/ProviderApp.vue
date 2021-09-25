<template>
  <EditorCommands v-if="store.state.absolute.commands" />
  <ProviderLoad v-if="store.state.absolute.load" />
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'

  const store = useStore()
</script>
