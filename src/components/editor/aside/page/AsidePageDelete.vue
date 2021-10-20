<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.project.page.delete.title')"
    :shortcuts="SHORTCUTS.deleteChapter[0]"
    @click.prevent="page.onDeletePage"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { usePage } from '@/use/page'
  import { useShortcutsStore } from '@/store/shortcuts'

  const page = usePage()

  const SHORTCUTS = useShortcutsStore()

  const { t } = useI18n()
</script>
