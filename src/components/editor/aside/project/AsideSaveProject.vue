<template>
  <AsideText
    :text="t('editor.aside.project.save.title')"
    :shortcuts="store.state.shortcuts.localSaveProject[0]"
    @click.prevent="local.onSaveProject"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useLocalStorage } from '@/use/storage/local'
  import { useStore } from 'vuex'

  const store = useStore()
  const local = useLocalStorage()

  const { t } = useI18n()
</script>
