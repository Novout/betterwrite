<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.project.page.delete.title')"
    :shortcuts="store.state.shortcuts.deleteChapter[0]"
    @click.prevent="page.onDeletePage"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'
  import { usePage } from '@/use/page'

  const page = usePage()

  const store = useStore()
  const { t } = useI18n()
</script>
