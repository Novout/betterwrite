<template>
  <div class="flex flex-col w-full p-1 my-8 shadow-lg lg:w-1/2">
    <h3 class="text-2xl font-bold text-theme-text-2">
      {{ t('editor.aside.configuration.entity.title') }}
    </h3>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.entity.updateTime') }}</p>
      <InputBoolean v-model="EDITOR.configuration.entity.updateTime" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useEditorStore } from '@/store/editor'
  import { useI18n } from 'vue-i18n'

  const EDITOR = useEditorStore()

  const { t } = useI18n()
</script>
