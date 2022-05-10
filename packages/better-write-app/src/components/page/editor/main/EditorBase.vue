<template>
  <div
    ref="main"
    class="flex flex-col overflow-hidden bg-theme-editor-background hover:bg-theme-editor-background-hover active:bg-theme-editor-background-active"
    :class="[
      EDITOR.configuration.draggable ? 'fixed' : 'inline-block',
      EDITOR.configuration.bars
        ? 'w-full lg:w-3/4 sm:w-10/12 shadow-xl'
        : 'w-full',
    ]"
  >
    <EditorBaseBlocked v-if="EDITOR.configuration.blocked" />
    <EditorBaseRender v-else />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useEditorStore } from '@/store/editor'
  import { useAbsoluteStore } from '@/store/absolute'

  const EDITOR = useEditorStore()
  const ABSOLUTE = useAbsoluteStore()

  const main = ref<HTMLElement | null>(null)
</script>
