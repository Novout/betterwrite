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
  import { useStore } from 'vuex'

  const store = useStore()

  useKeyboard().init()
  useLocalStorage(store).onAutoSave(60, store)

  onUnmounted(() => {
    useKeyboard().destroy()
  })
</script>
