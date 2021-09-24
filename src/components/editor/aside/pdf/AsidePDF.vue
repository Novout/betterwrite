<template>
  <button
    class="
      text-2xs
      w-full
      p-2
      font-bold
      dark:text-gray-300
      hover:border-b
      border-black
      dark:border-gray-300
      rounded-none
      flex
    "
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
