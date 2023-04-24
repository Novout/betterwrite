<template>
  <div
    v-for="(folder, index) in PROJECT.annotations.folders"
    :key="index"
    :class="[PROJECT.base === 'annotations' ? '' : 'opacity-70']"
    class="border-l border-theme-aside-graph-lines ml-1"
  >
    <AsideGraphAnnotationFolder :folder="folder" />
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'

  const PROJECT = useProjectStore()
</script>
