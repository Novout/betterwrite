<template>
  <button
    class="wb-aside-button hover:bg-black-opacity dark:hover:bg-white-opacity"
    @click="onGeneratePDF"
  >
    {{ t('editor.aside.pdf.title') }}
  </button>
</template>

<script setup lang="ts">
  import { usePDF } from '@/use/pdf'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()
  const { t } = useI18n()

  const onGeneratePDF = () => {
    usePDF()
      .create(store)
      .then(() => {})
  }
</script>
