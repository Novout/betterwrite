<template>
  <div class="flex-1">
    <EditorBaseRenderFinder v-if="ABSOLUTE.shortcuts.finder" />
    <EditorBaseRenderSwitcher v-else-if="ABSOLUTE.shortcuts.switcher" />
    <EditorBaseRenderDefault v-else />
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'

  const ABSOLUTE = useAbsoluteStore()
</script>
