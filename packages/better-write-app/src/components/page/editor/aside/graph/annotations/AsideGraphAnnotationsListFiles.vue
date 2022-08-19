<template>
  <div class="pt-2" />
  <div
    v-for="(file, index) in folder.files"
    :key="index"
    class="flex items-center justify-between bg-theme-aside-graph-background hover:bg-theme-aside-graph-background-hover active:bg-theme-aside-graph-background-active text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active ml-5"
  >
    <div
      class="truncate cursor-pointer"
      @click.prevent.stop="annotations.onStart(file)"
    >
      {{ file.fileName }}
    </div>
    <div @click.prevent.stop="annotations.onFileDelete({ file, folder })">
      <IconDelete class="w-5 h-5 wb-icon" />
    </div>
  </div>
  <div class="pb-2" />
</template>

<script setup lang="ts">
  import { ProjectStateAnnotationFolder } from 'better-write-types'
  import { useAnnotations } from '@/use/annotations'

  defineProps<{
    folder: ProjectStateAnnotationFolder
  }>()

  const annotations = useAnnotations()
</script>
