<template>
  <div
    :class="[
      !EDITOR.styles.base.backgroundData
        ? 'bg-theme-editor-full-background hover:bg-theme-editor-full-background-hover active:bg-theme-editor-full-background-active'
        : 'aspect-video',
      EDITOR.styles.base.backgroundCoverAttribute ? 'bg-cover' : '',
      EDITOR.styles.base.backgroundBlur ? 'bg-custom-blur' : '',
      EDITOR.styles.base.backgroundGrayscale ? 'bg-custom-grayscale' : '',
      EDITOR.styles.base.backgroundSaturate ? 'bg-custom-saturate' : '',
      EDITOR.styles.base.backgroundSepia ? 'bg-custom-sepia' : '',
    ]"
    :style="[
      EDITOR.styles.base.backgroundData
        ? { backgroundImage: `url(${EDITOR.styles.base.backgroundData})` }
        : {},
    ]"
    class="absolute w-full h-screen"
  />
  <section class="flex flex-col w-full z-10 bg-transparent">
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
