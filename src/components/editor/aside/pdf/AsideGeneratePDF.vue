<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.pdf.title')"
    :shortcuts="SHORTCUTS.generatePDF[0]"
    :icon="true"
    @click.prevent="pdf.external().onGeneratePDF"
  >
    <img width="20" class="mr-2" src="@/assets/editor/pdf.png" />
  </AsideText>
</template>

<script setup lang="ts">
  import { usePDF } from '@/use/pdf'
  import { useI18n } from 'vue-i18n'
  import { useShortcutsStore } from '@/store/shortcuts'

  const SHORTCUTS = useShortcutsStore()

  const { t } = useI18n()
  const pdf = usePDF()
</script>
