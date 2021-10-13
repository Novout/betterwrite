<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.pdf.configuration')"
    :shortcuts="store.state.shortcuts.configurationPDF[0]"
    :icon="true"
    @click.prevent="onConfiguration"
  >
    <img width="20" class="mr-2" src="@/assets/editor/pdf.png" />
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()
  const { t } = useI18n()

  const onConfiguration = () => {
    store.commit('absolute/switchPdfConfiguration', true)
  }
</script>
