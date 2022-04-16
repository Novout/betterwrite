<template>
  <div class="flex justify-between items-center w-full relative py-1">
    <h2 class="text-xl font-bold wb-text">
      {{ t('editor.bar.assistants.actions') }}
    </h2>
    <IconClose
      class="wb-icon w-8 h-8"
      @click.prevent.stop="ABSOLUTE.logger = false"
    />
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
</script>
