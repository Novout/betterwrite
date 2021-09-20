<template>
  <main class="wb-base flex justify-center items-center">
    <p class="wb-title">{{ t('hello') }}</p>
  </main>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
