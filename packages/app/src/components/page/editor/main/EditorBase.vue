<template>
  <div
    ref="main"
    class="flex flex-col wb-edit bg-theme-editor-background hover:bg-theme-editor-background-hover active:bg-theme-editor-background-active"
    :class="[
      EDITOR.configuration.draggable ? 'fixed' : 'inline-block',
      EDITOR.configuration.bars
        ? 'w-full lg:w-3/4 sm:w-10/12 shadow-xl'
        : 'w-full',
      TUTORIAL.counter === 2 ? 'z-umax' : 'z-20',
    ]"
  >
    <EditorBaseRenderHistory v-if="EDITOR.configuration.topBar" />
    <div id="entity-main" class="flex flex-col mb-auto overflow-y-auto wb-scroll">
      <EditorBaseRender v-if="PROJECT.base === 'chapter'" />
      <EditorBaseSchemas v-else-if="PROJECT.base === 'annotations'" />
    </div>
    <EditorBaseRenderBar v-if="EDITOR.configuration.bottomBar" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useEditorStore } from '@/store/editor'
  import { useProjectStore } from '@/store/project'
  import { useTutorialStore } from '@/store/tutorial'

  const EDITOR = useEditorStore()
  const PROJECT = useProjectStore()
  const TUTORIAL = useTutorialStore()

  const main = ref<HTMLElement | null>(null)
</script>
