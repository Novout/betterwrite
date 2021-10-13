<template>
  <section class="wb-base flex flex-col md:flex-row">
    <EditorAside />
    <main class="flex-1 bg-wb-image dark:bg-wb-image-dark">
      <EditorBase />
    </main>
  </section>
  <ProviderApp />
</template>

<script setup lang="ts">
  import { useKeyboard } from '@/use/keyboard'
  import { useLocalStorage } from '@/use/storage/local'
  import { onUnmounted } from 'vue'

  const keyboard = useKeyboard()

  keyboard.init()
  useLocalStorage().onAutoSave(60)

  onUnmounted(() => {
    keyboard.destroy()
  })
</script>
