<template>
  <section
    :class="[
      !EDITOR.styles.base.backgroundData
        ? 'bg-theme-editor-full-background hover:bg-theme-editor-full-background-hover active:bg-theme-editor-full-background-active'
        : '',
    ]"
    :style="[
      EDITOR.styles.base.backgroundData
        ? { backgroundImage: `url(${EDITOR.styles.base.backgroundData})` }
        : {},
    ]"
    class="flex flex-col w-full bg-cover"
  >
    <EditorBaseHeader />
    <section class="flex flex-col md:flex-row w-full">
      <EditorAside />
      <main class="flex justify-center w-full">
        <EditorBase />
      </main>
    </section>
  </section>
  <ProviderEditor />
</template>

<script setup lang="ts">
  import { useEditorStore } from '@/store/editor'
  import { useEditor } from '@/use/editor'

  const editor = useEditor()

  const EDITOR = useEditorStore()

  editor.init()
</script>
