<template>
  <section
    class="flex flex-col w-full bg-theme-editor-full-background hover:bg-theme-editor-full-background-hover active:bg-theme-editor-full-background-active"
  >
    <EditorBaseHeader />
    <section class="flex flex-col md:flex-row">
      <EditorAside />
      <main class="flex justify-center flex-1">
        <EditorBase />
      </main>
    </section>
  </section>
  <ProviderEditor />
</template>

<script setup lang="ts">
  import { useEditor } from '@/use/editor'

  const editor = useEditor()

  editor.init()
</script>
