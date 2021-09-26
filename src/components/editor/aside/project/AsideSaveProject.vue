<template>
  <AsideText
    :text="t('editor.aside.project.save.title')"
    :shortcuts="t('editor.shortcuts.localSaveProject')"
    @click.prevent="onSaveProject"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useLocalStorage } from '@/use/storage/local'
  import { useStore } from 'vuex'

  const store = useStore()

  const { onSaveProject } = useLocalStorage(store)

  const { t } = useI18n()
</script>
