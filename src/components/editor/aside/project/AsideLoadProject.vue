<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.project.load.title')"
    :shortcuts="store.state.shortcuts.localLoadProject[0]"
    @click.prevent="onLoadProject"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useLocalStorage } from '@/use/storage/local'
  import { useStore } from 'vuex'

  const store = useStore()

  const onLoadProject = () => {
    useLocalStorage(store).onLoadProject()
  }

  const { t } = useI18n()
</script>
