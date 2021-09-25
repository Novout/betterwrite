<template>
  <InjectButtonInstance class="wb-aside-button" @click.prevent="onSaveProject">
    {{ t('editor.aside.project.save.title') }}
  </InjectButtonInstance>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useLocalStorage } from '@/use/storage/local'
  import { useStore } from 'vuex'

  const store = useStore()

  const { onSaveProject } = useLocalStorage(store)

  const { t } = useI18n()
</script>
