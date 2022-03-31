<template>
  <EditorBaseRenderFinder v-if="ABSOLUTE.shortcuts.finder" />
  <EditorBaseRenderDefault v-else />
</template>

<script setup lang="ts">
import { useAbsoluteStore } from '@/store/absolute';

const ABSOLUTE = useAbsoluteStore()
</script>