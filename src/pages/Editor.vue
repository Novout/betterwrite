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
  import { useEnv } from '@/use/env'
  import { useKeyboard } from '@/use/keyboard'
  import { useLocalStorage } from '@/use/storage/local'
  import { useHead } from '@vueuse/head'
  import { computed, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()
  const keyboard = useKeyboard()
  const env = useEnv()
  const { t } = useI18n()

  keyboard.init()
  useLocalStorage().onAutoSave(60)

  onUnmounted(() => {
    keyboard.destroy()
  })

  const project = computed(() => store.state.project.nameRaw)
  const heading = computed(() => store.state.context.entity)

  const title = computed(() => t('seo.editor.title'))
  const description = computed(() => t('seo.editor.description'))

  const _title = computed(() =>
    project.value === env.projectEmpty()
      ? title.value
      : project.value + ' - ' + heading.value[0]?.raw
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
