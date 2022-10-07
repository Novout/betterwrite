<template>
  <GeneratorContainer>
    <GeneratorItem :title="t('editor.pdf.custom.generics.font')">
      <InputSelect
        v-model="pdf.headingOne.font"
        class="flex-1"
        :arr="fontFamily"
        :font="true"
      />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.custom.generics.fontSize')">
      <InputNumber v-model="pdf.headingOne.fontSize" />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.base.pageMargins.title')">
      <section>
        <label>{{ t('editor.pdf.base.pageMargins.top') }}</label>
        <InputNumber v-model="pdf.headingOne.margin.top" />
      </section>
      <section>
        <label>{{ t('editor.pdf.base.pageMargins.bottom') }}</label>
        <InputNumber v-model="pdf.headingOne.margin.bottom" />
      </section>
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.custom.generics.lineHeight')">
      <InputNumber v-model="pdf.headingOne.lineHeight" />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.custom.generics.bold')">
      <InputBoolean v-model="pdf.headingOne.bold" />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.custom.generics.italics')">
      <InputBoolean v-model="pdf.headingOne.italics" />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.custom.generics.alignment')">
      <InputSelect
        v-model="pdf.headingOne.alignment"
        class="flex-1"
        :arr="defines.pdf().alignment()"
      />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.custom.generics.characterSpacing')">
      <InputNumber v-model="pdf.headingOne.characterSpacing" />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.custom.generics.color')">
      <InputColorPicker v-model="pdf.headingOne.color" />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.custom.generics.background')">
      <InputColorPicker v-model="pdf.headingOne.background" />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.custom.generics.markerColor')">
      <InputColorPicker v-model="pdf.headingOne.markerColor" />
    </GeneratorItem>
    <PDFUtilsPreview :generator="pdf.headingOne" />
  </GeneratorContainer>
</template>

<script setup lang="ts">
  import { usePDFStore } from '@/store/pdf'
  import { useDefines } from '@/use/defines'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const defines = useDefines()

  const PDF = usePDFStore()

  const pdf = computed(() => PDF.styles)
  const fontFamily = computed(() => PDF.fonts)
</script>
