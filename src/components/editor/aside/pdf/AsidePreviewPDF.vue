<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.pdf.preview')"
    :shortcuts="SHORTCUTS.previewPDF[0]"
    :icon="true"
    @click.prevent="onPreviewPDF"
  >
    <img width="20" class="mr-2" src="@/assets/editor/pdf.png" />
  </AsideText>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useShortcutsStore } from '@/store/shortcuts'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()
  const SHORTCUTS = useShortcutsStore()

  const { t } = useI18n()

  const onPreviewPDF = async () => {
    ABSOLUTE.pdf.preview = true
  }
</script>
