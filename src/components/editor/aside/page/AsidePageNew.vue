<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.project.page.new.title')"
    :shortcuts="SHORTCUTS.newChapter[0]"
    @click.prevent="page.onCreatePage"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { usePage } from '@/use/page'
  import { useShortcutsStore } from '@/store/shortcuts'

  const SHORTCUTS = useShortcutsStore()

  const page = usePage()

  const { t } = useI18n()
</script>
