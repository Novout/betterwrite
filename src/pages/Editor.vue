<template>
  <section class="wb-base flex flex-col md:flex-row">
    <EditorAside />
    <main class="flex-1">
      <EditorBase />
    </main>
  </section>
  <ProviderEditor />
</template>

<script setup lang="ts">
  import { setTheme } from '@/plugin/theme/external'
import { ThemeNormalize } from '@/plugin/theme/utils'
  import { useContextStore } from '@/store/context'
  import { useEditorStore } from '@/store/editor'
  import { useProjectStore } from '@/store/project'
  import { useEntity } from '@/use/entity'
  import { useEnv } from '@/use/env'
  import { useKeyboard } from '@/use/keyboard'
  import { useProject } from '@/use/project'
  import { useLocalStorage } from '@/use/storage/local'
  import { useHead } from '@vueuse/head'
  import { computed, onMounted, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const EDITOR = useEditorStore()

  const keyboard = useKeyboard()
  const env = useEnv()
  const project = useProject()
  const entity = useEntity()
  const local = useLocalStorage()
  const router = useRouter()
  const { t } = useI18n()

  keyboard.init()

  onMounted(() => {
    project.onLoadProject()
  })

  setTheme()

  if (!env.isDev()) {
    window.onbeforeunload = function () {
      if (router.currentRoute.value.path === '/') local.onSaveProject()
    }
  }

  onUnmounted(() => {
    keyboard.destroy()
  })

  const title = computed(() => t('seo.editor.title'))
  const description = computed(() => t('seo.editor.description'))

  const _title = computed(() =>
    PROJECT.nameRaw === env.projectEmpty() ||
    !CONTEXT.entities[0] ||
    entity.utils().isFixed(0)
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
