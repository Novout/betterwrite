<template>
  <!-- Project -->
  <EditorHeaderButton type="vault">
    <template #text>
      {{ t('editor.header.vault') }}
    </template>
    <template #icon>
      <IconVoid class="h-9 w-9 lg:(w-7 h-7)" />
    </template>
    <template #bar>
      <EditorVaultList />
    </template>
  </EditorHeaderButton>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
