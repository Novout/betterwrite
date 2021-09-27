<template>
  <section class="wb-base flex flex-col md:flex-row">
    <EditorAside />
    <main class="flex-1 bg-wb-image dark:bg-wb-image-dark">
      <EditorBase />
    </main>
  </section>
</template>

<script setup lang="ts">
  import { useKeyboard } from '@/use/keyboard'
  import { onUnmounted } from 'vue'

  useKeyboard().init()

  onUnmounted(() => {
    useKeyboard().destroy()
  })
</script>
