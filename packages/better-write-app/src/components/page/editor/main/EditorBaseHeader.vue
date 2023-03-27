<template>
  <header
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="100"
    :class="[
      TUTORIAL.counter === 4 || TUTORIAL.counter === 5 ? 'z-umax' : 'z-60',
    ]"
    class="flex h-12 justify-between items-center w-full shadow-lg bg-theme-editor-background hover:bg-theme-editor-background-hover active:bg-theme-editor-background-active"
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
        <EditorBaseHeaderCreate />
        <EditorBaseHeaderExternals />
        <EditorBaseHeaderVault />
        <EditorBaseHeaderHelp />
      </div>
    </div>
    <EditorBaseHeaderLogin />
  </header>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/store/auth'
  import { useEditorStore } from '@/store/editor'
  import { useTutorialStore } from '@/store/tutorial'

  const AUTH = useAuthStore()
  const EDITOR = useEditorStore()
  const TUTORIAL = useTutorialStore()
</script>
