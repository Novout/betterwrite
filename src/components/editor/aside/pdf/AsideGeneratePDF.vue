<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.pdf.title')"
    :shortcuts="store.state.shortcuts.generatePDF[0]"
    :icon="true"
    @click.prevent="onGeneratePDF"
  >
    <img width="20" class="mr-2" src="@/assets/editor/pdf.png" />
  </AsideText>
</template>

<script setup lang="ts">
  import { usePDF } from '@/use/pdf'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()
  const { t } = useI18n()

  const onGeneratePDF = async () => {
    usePDF().external(store).onGeneratePDF()
  }
</script>
