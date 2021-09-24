<template>
  <InjectButtonInstance
    class="wb-aside-button"
    @click.prevent="usePage().onCreatePage"
  >
    {{ t('editor.aside.project.page.new.title') }}
  </InjectButtonInstance>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { usePage } from '@/use/page'

  const { t } = useI18n()
</script>
