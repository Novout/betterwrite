<template>
  <PDFConfigurationSlot v-if="!project.isBlankProject()">
    <template #title>
      <h2 class="text-2xl ml-2 font-bold font-poppins">
        {{ t('editor.pdf.custom.title.headingOne') }}
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
          v-model="pdf.headingOne.font"
          class="flex-1"
          :arr="fontFamily"
          :font="true"
        />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.fontSize')
        }}</label>
        <InputNumber v-model="pdf.headingOne.fontSize" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.base.pageMargins.title')
        }}</label>
        <section>
          <label>{{ t('editor.pdf.base.pageMargins.top') }}</label>
          <InputNumber v-model="pdf.headingOne.margin.top" />
        </section>
        <section>
          <label>{{ t('editor.pdf.base.pageMargins.bottom') }}</label>
          <InputNumber v-model="pdf.headingOne.margin.bottom" />
        </section>
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.lineHeight')
        }}</label>
        <InputNumber v-model="pdf.headingOne.lineHeight" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.bold')
        }}</label>
        <InputBoolean v-model="pdf.headingOne.bold" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.italics')
        }}</label>
        <InputBoolean v-model="pdf.headingOne.italics" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.alignment')
        }}</label>
        <InputSelect
          v-model="pdf.headingOne.alignment"
          class="flex-1"
          :arr="useDefines().pdf().alignment()"
        />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.characterSpacing')
        }}</label>
        <InputNumber v-model="pdf.headingOne.characterSpacing" />
      </div>
      <div class="wb-input-container">
        <label class="mx-1 text-xs">{{
          t('editor.pdf.custom.generics.color')
        }}</label>
        <InputColorPicker v-model="pdf.headingOne.color" />
      </div>
      <div class="wb-input-container">
        <label class="mx-1 text-xs">{{
          t('editor.pdf.custom.generics.background')
        }}</label>
        <InputColorPicker v-model="pdf.headingOne.background" />
      </div>
      <div class="wb-input-container">
        <label class="mx-1 text-xs">{{
          t('editor.pdf.custom.generics.markerColor')
        }}</label>
        <InputColorPicker v-model="pdf.headingOne.markerColor" />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.decoration')
        }}</label>
        <InputSelect
          v-model="pdf.headingOne.decoration"
          class="flex-1"
          :arr="useDefines().pdf().decoration()"
        />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.decorationStyle')
        }}</label>
        <InputSelect
          v-model="pdf.headingOne.decorationStyle"
          class="flex-1"
          :arr="useDefines().pdf().decorationStyle()"
        />
      </div>
      <div class="wb-input-container">
        <label class="mx-2 text-xs">{{
          t('editor.pdf.custom.generics.breakPage')
        }}</label>
        <InputBoolean v-model="pdf.headingOne.breakPage" />
      </div>
    </div>
  </PDFConfigurationSlot>
</template>

<script setup lang="ts">
  import { usePDFStore } from '@/store/pdf'
  import { useDefines } from '@/use/defines'
  import { useProject } from '@/use/project'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PDF = usePDFStore()

  const { t } = useI18n()
  const project = useProject()

  const pdf = computed(() => PDF.styles)

  const fontFamily = computed(() => PDF.fonts)
</script>
