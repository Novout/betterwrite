<template>
  <PDFConfigurationSlot>
    <template #title>
      <h2 class="text-2xl ml-2 font-bold font-poppins">
        {{ t('editor.pdf.custom.title.headingTwo') }}
      </h2>
    </template>
    <div
      class="
        flex flex-row flex-wrap
        justify-between
        items-center
        my-3
        overflow-x-hidden
      "
    >
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.font')
        }}</label>
        <InputSelect
          v-model="pdf.headingTwo.font"
          class="flex-1"
          :arr="fontFamily"
          :font="true"
        />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.fontSize')
        }}</label>
        <InputNumber v-model="pdf.headingTwo.fontSize" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.base.pageMargins.title')
        }}</label>
        <section>
          <label>{{ t('editor.pdf.base.pageMargins.top') }}</label>
          <InputNumber v-model="pdf.headingTwo.margin.top" />
        </section>
        <section>
          <label>{{ t('editor.pdf.base.pageMargins.bottom') }}</label>
          <InputNumber v-model="pdf.headingTwo.margin.bottom" />
        </section>
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.lineHeight')
        }}</label>
        <InputNumber v-model="pdf.headingTwo.lineHeight" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.bold')
        }}</label>
        <InputBoolean v-model="pdf.headingTwo.bold" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.italics')
        }}</label>
        <InputBoolean v-model="pdf.headingTwo.italics" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.alignment')
        }}</label>
        <InputSelect
          v-model="pdf.headingTwo.alignment"
          class="flex-1"
          :arr="useDefines().pdf().alignment()"
        />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.characterSpacing')
        }}</label>
        <InputNumber v-model="pdf.headingTwo.characterSpacing" />
      </div>
      <div class="wb-input-container">
        <label class="mx-1 text-xs">{{
          t('editor.pdf.custom.generics.color')
        }}</label>
        <InputColorPicker v-model="pdf.headingTwo.color" />
      </div>
      <div class="wb-input-container">
        <label class="mx-1 text-xs">{{
          t('editor.pdf.custom.generics.background')
        }}</label>
        <InputColorPicker v-model="pdf.headingTwo.background" />
      </div>
      <div class="wb-input-container">
        <label class="mx-1 text-xs">{{
          t('editor.pdf.custom.generics.markerColor')
        }}</label>
        <InputColorPicker v-model="pdf.headingTwo.markerColor" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.breakPage')
        }}</label>
        <InputBoolean v-model="pdf.headingTwo.breakPage" />
      </div>
    </div>
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
