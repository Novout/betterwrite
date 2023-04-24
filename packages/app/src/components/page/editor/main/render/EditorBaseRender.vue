<template>
  <EditorBaseRenderFinder v-if="ABSOLUTE.shortcuts.finder" />
  <EditorBaseRenderSwitcher v-else-if="ABSOLUTE.shortcuts.switcher" />
  <EditorBaseRenderDefault v-else />
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'

  const ABSOLUTE = useAbsoluteStore()
</script>
