<template>
  <div
    ref="main"
    class="flex flex-col overflow-hidden h-screen bg-theme-editor-background hover:bg-theme-editor-background-hover active:bg-theme-editor-background-active"
    :class="[
      EDITOR.configuration.draggable ? 'fixed' : 'inline-block',
      EDITOR.configuration.bars
        ? 'w-10/12 lg:w-3/4 sm:w-10/12 shadow-xl'
        : 'w-full',
    ]"
  >
    <EditorBaseHeader />
    <EditorBaseBlocked v-if="PROJECT.name === env.projectEmpty()" />
    <EditorBaseRender />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useEnv } from '@/use/env'
  import { useProjectStore } from '@/store/project'
  import { useEditorStore } from '@/store/editor'

  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()

  const env = useEnv()

  const main = ref<HTMLElement | null>(null)
</script>
