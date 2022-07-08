<template>
  <GeneratorContainer>
    <GeneratorItem :title="t('editor.pdf.cover.type')">
      <InputBoolean v-model="pdf.switcher.header" />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.header"
      :title="t('editor.pdf.base.header.fontFamily')"
    >
      <InputSelect
        v-model="pdf.base.header.fontFamily"
        class="flex-1"
        :arr="PDF.fonts"
        :font="true"
      />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.header"
      :title="t('editor.pdf.base.header.start')"
    >
      <InputNumber v-model="pdf.base.header.start" />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.header"
      :title="t('editor.pdf.base.header.content')"
    >
      <InputText
        v-model="pdf.base.header.content"
        class="shadow-lg bg-theme-background-opacity-1"
      />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.header"
      :title="t('editor.pdf.base.header.type')"
    >
      <InputSelect
        v-model="pdf.base.header.textType"
        :arr="defines.pdf().base().footerStyle()"
      />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.header"
      :title="t('editor.pdf.base.header.alignment')"
    >
      <InputSelect
        v-model="pdf.base.header.alignment"
        :arr="defines.pdf().base().alignment()"
      />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.header"
      :title="t('editor.pdf.base.header.size')"
    >
      <InputNumber v-model="pdf.base.header.textSize" />
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
