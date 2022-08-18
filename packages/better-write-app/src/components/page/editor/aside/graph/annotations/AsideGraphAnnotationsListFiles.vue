<template>
  <div
    v-for="(file, index) in folder.files"
    :key="index"
    class="cursor-pointer bg-theme-aside-graph-background hover:bg-theme-aside-graph-background-hover active:bg-theme-aside-graph-background-active text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active ml-5"
    @click.prevent.stop="plugin.emit('plugin-annotations-start', file)"
  >
    {{ file.fileName }}
  </div>
</template>

<script setup lang="ts">
  import { usePlugin } from 'better-write-plugin-core'
  import { ProjectStateAnnotationFolder } from 'better-write-types'

  defineProps<{
    folder: ProjectStateAnnotationFolder
  }>()

  const plugin = usePlugin()
</script>
