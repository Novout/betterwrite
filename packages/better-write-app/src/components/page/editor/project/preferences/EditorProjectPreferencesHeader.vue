<template>
  <div class="flex items-center justify-between px-3 w-full shadow">
    <PreferencesContainerTitle>{{
      t('editor.preferences.header.title')
    }}</PreferencesContainerTitle>
    <IconClose class="wb-icon h-8 w-8" @click.prevent.stop="onClose" />
  </div>
</template>
<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useLocalStorage } from '@/use/storage/local'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()

  const local = useLocalStorage()
  const { t } = useI18n()

  const onClose = () => {
    if (confirm(t('editor.preferences.header.close'))) {
      local.onSaveProject(false).finally(() => window.location.reload())

      return
    }

    ABSOLUTE.project.preferences = false
  }
</script>
