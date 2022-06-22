<template>
  <GeneratorContainer>
    <GeneratorItem :title="t('generator.block.fontSize')">
      <InputNumber v-model="DOCX.styles.headingTwo.size" :step="2" />
    </GeneratorItem>
    <GeneratorItem :title="t('generator.block.bold')">
      <InputBoolean v-model="DOCX.styles.headingTwo.bold" />
    </GeneratorItem>
    <GeneratorItem :title="t('generator.block.italics')">
      <InputBoolean v-model="DOCX.styles.headingTwo.italics" />
    </GeneratorItem>
    <GeneratorItem :title="t('generator.block.alignment.title')">
      <InputSelect
        v-model="DOCX.styles.headingTwo.alignment"
        :arr="defines.docx().entityAlignment()"
      />
    </GeneratorItem>
    <GeneratorItem :title="t('generator.block.margin.title')">
      <GeneratorColumn>
        <p>{{ t('generator.block.margin.top') }}</p>
        <InputNumber v-model="DOCX.styles.headingTwo.margin.top" :step="10" />
      </GeneratorColumn>
      <GeneratorColumn>
        <p>{{ t('generator.block.margin.bottom') }}</p>
        <InputNumber
          v-model="DOCX.styles.headingTwo.margin.bottom"
          :step="10"
        />
      </GeneratorColumn>
    </GeneratorItem>
    <GeneratorItem :title="t('generator.block.fontColor')">
      <InputColorPicker v-model="DOCX.styles.headingTwo.color" />
    </GeneratorItem>
    <DOCXConfigurationPreviewHeading :generator="DOCX.styles.headingTwo" />
  </GeneratorContainer>
</template>

<script setup lang="ts">
  import { useDOCXStore } from '@/store/docx'
  import { useDefines } from '@/use/defines'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const defines = useDefines()

  const DOCX = useDOCXStore()
</script>
