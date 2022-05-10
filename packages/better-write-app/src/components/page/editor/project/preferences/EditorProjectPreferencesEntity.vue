<template>
  <div class="flex flex-col w-full p-1 my-8 shadow-lg lg:w-1/2">
    <h3 class="text-2xl font-bold text-theme-text-2">
      {{ t('editor.aside.configuration.entity.title') }}
    </h3>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.bars') }}</p>
      <InputBoolean v-model="EDITOR.configuration.bars" :specific="true" />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.bottomBar') }}</p>
      <InputBoolean v-model="EDITOR.configuration.bottomBar" :specific="true" />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.transition') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.transition"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.autosave') }}</p>
      <InputBoolean v-model="EDITOR.configuration.autosave" :specific="true" />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.configuration.blocked') }}</p>
      <InputBoolean v-model="EDITOR.configuration.blocked" :specific="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useEditorStore } from '@/store/editor'
  import { useI18n } from 'vue-i18n'

  const EDITOR = useEditorStore()

  const { t } = useI18n()
</script>
