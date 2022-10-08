<template>
  <div class="pt-2" />
  <draggable
    class="flex flex-col items-center justify-between ml-5"
    :list="folder.files"
    item-key="id"
  >
    <template #item="{ element }">
      <div
        class="flex justify-between items-center w-full bg-theme-aside-graph-background hover:bg-theme-aside-graph-background-hover active:bg-theme-aside-graph-background-active text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active"
      >
        <div
          class="truncate cursor-pointer"
          @click.prevent.stop="annotations.onStart(element)"
        >
          {{ element.fileName }}
        </div>
        <div
          @click.prevent.stop="
            annotations.onFileDelete({ file: element, folder })
          "
        >
          <IconDelete class="wb-aside-icon" />
        </div>
      </div>
    </template>
  </draggable>
  <div class="pb-2" />
</template>

<script setup lang="ts">
  import { ProjectStateAnnotationFolder } from 'better-write-types'
  import { useAnnotations } from '@/use/annotations'
  import draggable from 'vuedraggable'

  defineProps<{
    folder: ProjectStateAnnotationFolder
  }>()

  const annotations = useAnnotations()
</script>
