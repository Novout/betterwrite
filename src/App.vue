<template>
  <router-view></router-view>
  <ProviderApp />
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStart } from '@/use/start'

  const { t } = useI18n()

  useStart().init()
</script>
