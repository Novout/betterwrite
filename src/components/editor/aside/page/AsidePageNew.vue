<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.project.page.new.title')"
    :shortcuts="store.state.shortcuts.newChapter[0]"
    @click.prevent="page.onCreatePage"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { usePage } from '@/use/page'
  import { useStore } from 'vuex'

  const page = usePage()

  const store = useStore()
  const { t } = useI18n()
</script>
