<template>
  <section class="wb-base flex flex-col md:flex-row">
    <EditorAside />
    <main
      class="flex justify-center flex-1 bg-theme-editor-full-background hover:bg-theme-editor-full-background-hover active:bg-theme-editor-full-background-active"
    >
      <EditorBase />
    </main>
  </section>
  <ProviderEditor />
</template>

<script setup lang="ts">
  import { useEditor } from '@/use/editor'

  const editor = useEditor()

  editor.init()
</script>
