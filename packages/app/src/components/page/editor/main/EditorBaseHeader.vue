<template>
  <header
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="100"
    :class="[
      TUTORIAL.counter === 4 || TUTORIAL.counter === 5 ? 'z-umax' : 'z-60',
    ]"
    class="flex pr-2 sm:pr-5 h-12 justify-between items-center w-full shadow-lg bg-theme-editor-background hover:bg-theme-editor-background-hover active:bg-theme-editor-background-active"
  >
    <div class="flex gap-1 sm:gap-2 lg:gap-5 items-center justify-start">
      <Logo class="ml-3" :back="false" :width="19" />
      <div
        :style="{
          fontFamily: EDITOR.styles.header.fontFamily,
          fontWeight: EDITOR.styles.header.fontWeight,
          fontSize: `${EDITOR.styles.header.fontSize}px`,
        }"
        class="flex items-center justify-between"
      >
        <EditorBaseHeaderProject />
        <EditorBaseHeaderCreate v-if="PROJECT.type !== 'only-annotations'" />
        <EditorBaseHeaderExternals v-if="PROJECT.type !== 'only-annotations'" />
        <EditorBaseHeaderVault />
        <EditorBaseHeaderHelp />
      </div>
    </div>
    <EditorBaseHeaderUser />
  </header>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useEditorStore } from '@/store/editor'
  import { useTutorialStore } from '@/store/tutorial'

  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const TUTORIAL = useTutorialStore()
</script>
