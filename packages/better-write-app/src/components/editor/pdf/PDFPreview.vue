<template>
  <section class="flex flex-col w-full bg-theme-editor-pdf-preview-background">
    <HeroIcon v-if="exists" class="wb-icon w-7" @click.prevent="onClick">
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
    <div ref="preview" :class="[exists ? 'h-3/4 p-5' : '']"></div>
  </section>
</template>

<script setup lang="ts">
  import { usePDF } from '@/use/pdf'
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'
  import useEmitter from '@/use/emitter'
  import { useAbsoluteStore } from '@/store/absolute'

  const ABSOLUTE = useAbsoluteStore()

  const preview = ref<HTMLElement | null>(null)
  const exists = ref<boolean>(false)
  const { t } = useI18n()
  const toast = useToast()
  const pdf = usePDF()
  const emitter = useEmitter()

  onMounted(() => {
    pdf.external().onPreviewPDF(preview.value as HTMLElement)

    toast.warning(t('toast.pdf.previewProblems'))

    emitter.on('pdf-preview-exists', () => {
      exists.value = true
    })
  })

  const onClick = () => {
    ABSOLUTE.pdf.preview = false
  }
</script>
