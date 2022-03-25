<template>
  <div class="z-20 flex justify-center items-center w-full">
    <p class="wb-text font-bold text-base md:text-xl lg:text-2xl">
      {{ t('editor.aside.project.blocked') }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
