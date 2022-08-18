<template>
  <div
    v-for="(folder, index) in PROJECT.annotations.folders"
    :key="index"
    :class="[PROJECT.base === 'annotations' ? '' : 'opacity-70']"
    class="border-l border-theme-aside-graph-lines ml-1"
  >
    <div class="flex justify-between items-center w-full">
      <div class="flex items-center ml-2">
        <IconFolderOpen class="wb-icon w-5 h-5" />
        <InputText
          v-model="folder.folderName"
          class="wb-text bg-transparent py-0.5 rounded hover:bg-theme-background-opacity-1 focus:bg-theme-background-opacity-1 ml-2 font-bold font-raleway w-2/3 text-left truncate"
        />
      </div>
      <div @click="plugin.emit('plugin-annotations-file-create', folder)">
        <IconFileAdd class="wb-icon w-6 h-6" />
      </div>
    </div>
    <AsideGraphAnnotationsListFiles :folder="folder" />
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { usePlugin } from 'better-write-plugin-core'

  const PROJECT = useProjectStore()

  const plugin = usePlugin()
</script>
