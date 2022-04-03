<template>
  <PDFConfigurationSlot>
    <template #title>
      <h2 class="text-2xl ml-2 font-bold font-poppins">
        {{ t('editor.pdf.custom.title.paragraph') }}
      </h2>
    </template>
    <div class="wb-pdf-container">
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.font')
        }}</label>
        <InputSelect
          v-model="pdf.paragraph.font"
          class="flex-1"
          :arr="fontFamily"
          :font="true"
        />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.fontSize')
        }}</label>
        <InputNumber v-model="pdf.paragraph.fontSize" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.base.pageMargins.title')
        }}</label>
        <section>
          <label>{{ t('editor.pdf.base.pageMargins.top') }}</label>
          <InputNumber v-model="pdf.paragraph.margin.top" />
        </section>
        <section>
          <label>{{ t('editor.pdf.base.pageMargins.bottom') }}</label>
          <InputNumber v-model="pdf.paragraph.margin.bottom" />
        </section>
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.lineHeight')
        }}</label>
        <InputNumber v-model="pdf.paragraph.lineHeight" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.alignment')
        }}</label>
        <InputSelect
          v-model="pdf.paragraph.alignment"
          class="flex-1"
          :arr="useDefines().pdf().alignment()"
        />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.indent')
        }}</label>
        <InputNumber v-model="pdf.paragraph.indent" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.characterSpacing')
        }}</label>
        <InputNumber v-model="pdf.paragraph.characterSpacing" />
      </div>
      <div class="wb-input-container">
        <label class="mx-1 text-xs">{{
          t('editor.pdf.custom.generics.color')
        }}</label>
        <InputColorPicker v-model="pdf.paragraph.color" />
      </div>
      <div class="wb-input-container">
        <label class="mx-1 text-xs">{{
          t('editor.pdf.custom.generics.background')
        }}</label>
        <InputColorPicker v-model="pdf.paragraph.background" />
      </div>
      <div class="wb-input-container">
        <label class="mx-1 text-xs">{{
          t('editor.pdf.custom.generics.markerColor')
        }}</label>
        <InputColorPicker v-model="pdf.paragraph.markerColor" />
      </div>
    </div>
    <PDFUtilsPreview :generator="pdf.paragraph" />
  </PDFConfigurationSlot>
</template>

<script setup lang="ts">
  import { usePDFStore } from '@/store/pdf'
  import { useDefines } from '@/use/defines'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PDF = usePDFStore()

  const { t } = useI18n()

  const pdf = computed(() => PDF.styles)

  const fontFamily = computed(() => PDF.fonts)
</script>
