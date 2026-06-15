<template>
  <div
    ref="main"
    class="flex flex-col wb-edit bg-theme-editor-background hover:bg-theme-editor-background-hover active:bg-theme-editor-background-active"
    :class="[
      EDITOR.configuration.draggable ? 'fixed' : 'inline-block',
      EDITOR.configuration.bars ? editorWidthClass : 'w-full',
      TUTORIAL.counter === 2 ? 'z-umax' : 'z-20',
    ]"
  >
    <EditorBaseRenderHistory v-if="EDITOR.configuration.topBar" />
    <div
      id="entity-main"
      class="flex flex-col mb-auto overflow-y-auto wb-scroll"
    >
      <EditorBaseRender v-if="PROJECT.base === 'chapter'" />
      <EditorBaseSchemas v-else-if="PROJECT.base === 'annotations'" />
    </div>
    <EditorBaseRenderBar v-if="EDITOR.configuration.bottomBar" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { useEditorStore } from '@/store/editor'
  import { useProjectStore } from '@/store/project'
  import { useTutorialStore } from '@/store/tutorial'

  const EDITOR = useEditorStore()
  const PROJECT = useProjectStore()
  const TUTORIAL = useTutorialStore()

  const main = ref<HTMLElement | null>(null)

  const editorWidthClass = computed(() => {
    const widthMap = {
      narrow: 'w-full sm:w-8/12 lg:w-1/2 shadow-xl',
      medium: 'w-full sm:w-10/12 lg:w-3/4 shadow-xl',
      wide: 'w-full sm:w-11/12 lg:w-10/12 shadow-xl',
      full: 'w-full',
    }
    return widthMap[EDITOR.styles.base?.editorWidth ?? 'medium']
  })
</script>
