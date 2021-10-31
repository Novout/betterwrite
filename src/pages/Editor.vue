<template>
  <section class="wb-base flex flex-col md:flex-row">
    <EditorAside />
    <main class="flex-1 bg-wb-image dark:bg-wb-image-dark">
      <EditorBase />
    </main>
  </section>
  <ProviderEditor />
</template>

<script setup lang="ts">
  import { useContextStore } from '@/store/context'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useKeyboard } from '@/use/keyboard'
  import { useProject } from '@/use/project'
  import { useHead } from '@vueuse/head'
  import { computed, onMounted, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const keyboard = useKeyboard()
  const env = useEnv()
  const project = useProject()
  const { t } = useI18n()

  keyboard.init()

  onMounted(() => {
    project.onLoadProject()
  })

  onUnmounted(() => {
    keyboard.destroy()
  })

  const title = computed(() => t('seo.editor.title'))
  const description = computed(() => t('seo.editor.description'))

  const _title = computed(() =>
    PROJECT.nameRaw === env.projectEmpty() || !CONTEXT.entities[0]
      ? title.value
      : PROJECT.nameRaw + ' - ' + CONTEXT.entities[0]?.raw
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
