<template>
  <HeroIcon class="wb-text" @click.prevent="onClick">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </HeroIcon>
  <div ref="preview" class="h-1/2"></div>
</template>

<script setup lang="ts">
  import { usePDF } from '@/use/pdf'
  import { ref, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

  const preview = ref<HTMLElement | null>(null)
  const store = useStore()
  const { t } = useI18n()
  const toast = useToast()

  onMounted(() => {
    usePDF().external(store).onPreviewPDF(preview.value)

    toast.error(t('toast.pdf.previewProblems'))
  })

  const onClick = () => {
    store.commit('absolute/switchPdfPreview', false)
  }
</script>
