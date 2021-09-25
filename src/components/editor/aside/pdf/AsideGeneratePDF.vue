<template>
  <button class="wb-aside-button" @click="onGeneratePDF">
    {{ t('editor.aside.pdf.title') }}
  </button>
</template>

<script setup lang="ts">
  import { usePDF } from '@/use/pdf'
  import { nextTick } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'

  const store = useStore()
  const { t } = useI18n()

  const onGeneratePDF = async () => {
    store.commit('absolute/load', true)

    await nextTick
    usePDF()
      .create(store)
      .then(() => {
        store.commit('absolute/load', false)
      })
  }
</script>
