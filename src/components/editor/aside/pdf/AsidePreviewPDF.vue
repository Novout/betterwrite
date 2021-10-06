<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.pdf.preview')"
    :shortcuts="store.state.shortcuts.previewPDF[0]"
    :icon="true"
    @click.prevent="onPreviewPDF"
  >
    <img width="20" class="mr-2" src="@/assets/editor/pdf.png" />
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()
  const { t } = useI18n()

  const onPreviewPDF = async () => {
    store.commit('absolute/switchPdfPreview', true)
  }
</script>
