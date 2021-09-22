<template>
  <div class="z-50 flex justify-center items-center w-full h-editor border">
    <p class="wb-text font-bold">{{ t('editor.aside.project.blocked') }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
