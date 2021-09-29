<template>
  <AsideText
    class="wb-aside-button"
    :text="t('editor.aside.pdf.configuration')"
    :shortcuts="store.state.shortcuts.configurationPDF[0]"
    @click.prevent="onConfiguration"
  >
  </AsideText>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'
  import { usePage } from '@/use/page'

  const store = useStore()
  const { t } = useI18n()

  const onConfiguration = () => {
    store.commit('absolute/switchPdfConfiguration', true)
  }
</script>
