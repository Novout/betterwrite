<template>
  <!-- Create -->
  <EditorHeaderButton>
    <template #text>
      {{ t('editor.header.live') }}
    </template>
    <template #icon>
      <IconLive class="h-9 w-9 md:(w-7 h-7)" />
    </template>
    <template #bar>
      <EditorHeaderItem
        :text="t('editor.bar.live.create')"
        @action="ABSOLUTE.live.create = true"
      >
      </EditorHeaderItem>
      <EditorHeaderItem
        :text="t('editor.bar.live.enter')"
        @action="ABSOLUTE.live.enter = true"
      >
      </EditorHeaderItem>
    </template>
  </EditorHeaderButton>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
</script>
