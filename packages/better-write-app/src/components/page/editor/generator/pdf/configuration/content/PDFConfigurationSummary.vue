<template>
  <GeneratorContainer>
    <GeneratorItem :title="t('editor.pdf.cover.type')">
      <InputBoolean v-model="pdf.switcher.summary" />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.summary"
      :title="t('editor.pdf.base.summary.type')"
    >
      <InputSelect
        v-model="pdf.base.summary.type"
        :arr="defines.pdf().base().summaryStyle()"
      />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.summary"
      :title="t('editor.pdf.base.summary.fontSize')"
    >
      <InputNumber v-model="pdf.base.summary.fontSize" />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.summary"
      :title="t('editor.pdf.base.summary.fontFamily')"
    >
      <InputSelect
        v-model="pdf.base.summary.fontFamily"
        class="flex-1"
        :arr="PDF.fonts"
        :font="true"
      />
    </GeneratorItem>
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
</script>
