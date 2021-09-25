<template>
  <router-view></router-view>
  <ProviderApp />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStart } from '@/use/start'
  import { useIndexedDB } from '@/use/storage/indexed'

  const { t } = useI18n()

  useStart().init()

  onMounted(() => {})
</script>
