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
  import { useContextStore } from '@/store/context'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useKeyboard } from '@/use/keyboard'
  import { useLocalStorage } from '@/use/storage/local'
  import { useHead } from '@vueuse/head'
  import { computed, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'

  const projectStore = useProjectStore()
  const contextStore = useContextStore()

  const keyboard = useKeyboard()
  const env = useEnv()
  const { t } = useI18n()

  keyboard.init()
  useLocalStorage().onAutoSave(60)

  onUnmounted(() => {
    keyboard.destroy()
  })

  const title = computed(() => t('seo.editor.title'))
  const description = computed(() => t('seo.editor.description'))

  const _title = computed(() =>
    projectStore.nameRaw === env.projectEmpty()
      ? title.value
      : projectStore.nameRaw + ' - ' + contextStore.entity[0]?.raw
  )

  useHead({
    title: _title,
    meta: [
      {
        name: `description`,
        content: description,
      },
    ],
  })
</script>
