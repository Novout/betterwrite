<template>
  <EditorCommands v-if="store.state.absolute.commands" />
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'

  const store = useStore()
</script>
