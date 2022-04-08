<template>
  <PDFConfigurationSlot>
    <template #title>
      <section class="flex gap-2">
        <h2 class="text-2xl ml-2 font-bold font-poppins">
          {{ t('editor.pdf.custom.generics.lineBreak') }}
        </h2>
      </section>
    </template>
    <div class="wb-pdf-container">
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.lineBreak.spacing')
        }}</label>
        <InputNumber v-model="pdf.lineBreak.spacing" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.lineBreak.active')
        }}</label>
        <InputBoolean v-model="pdf.lineBreak.image.active" />
      </div>
      <div
        :class="[!pdf.lineBreak.image.active ? 'wb-disabled' : '']"
        class="wb-input-container"
      >
        <label class="mx-2 text-xs">{{ t('editor.pdf.cover.type') }}</label>
        <InputFile
          id="main-background"
          :title="t('generics.input.image')"
          :src="pdf.lineBreak.image.data"
          @load="onMainImageLoad"
          @exclude="onDeleteMainImage"
        />
      </div>
      <div
        :class="[!pdf.lineBreak.image.active ? 'wb-disabled' : '']"
        class="wb-input-container"
      >
        <label class="mx-2 text-xs">{{ t('editor.pdf.lineBreak.size') }}</label>
        <section>
          <label>{{ t('editor.pdf.custom.image.width') }}</label>
          <InputNumber v-model="pdf.lineBreak.image.width" :step="25" />
        </section>
        <section>
          <label>{{ t('editor.pdf.custom.image.height') }}</label>
          <InputNumber v-model="pdf.lineBreak.image.height" :step="25" />
        </section>
      </div>
    </div>
  </PDFConfigurationSlot>
</template>

<script setup lang="ts">
  import { usePDFStore } from '@/store/pdf'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PDF = usePDFStore()

  const { t } = useI18n()

  const pdf = computed(() => PDF.styles)

  const onMainImageLoad = (e: any) => {
    PDF.styles.lineBreak.image.data = e
  }

  const onDeleteMainImage = () => {
    PDF.styles.lineBreak.image.data = ''
  }
</script>
