<template>
  <div
    ref="main"
    class="flex flex-col overflow-hidden z-20 bg-theme-editor-background hover:bg-theme-editor-background-hover active:bg-theme-editor-background-active"
    :class="[
      EDITOR.configuration.draggable ? 'fixed' : 'inline-block',
      EDITOR.configuration.bars
        ? 'w-full lg:w-3/4 sm:w-10/12 shadow-xl'
        : 'w-full',
    ]"
  >
    <EditorBaseRender v-if="PROJECT.base === 'chapter'" />
    <EditorBaseTimeline v-else-if="PROJECT.base === 'timeline'" />
    <EditorBaseAnnotations v-else-if="PROJECT.base === 'annotations'" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useEditorStore } from '@/store/editor'
  import { useProjectStore } from '@/store/project'

  const EDITOR = useEditorStore()
  const PROJECT = useProjectStore()

  const main = ref<HTMLElement | null>(null)
</script>
