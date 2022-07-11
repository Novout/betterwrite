<template>
  <GeneratorContainer>
    <GeneratorItem :title="t('editor.pdf.cover.type')">
      <InputBoolean v-model="pdf.switcher.footer" />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.footer"
      :title="t('editor.pdf.base.footer.start')"
    >
      <InputNumber v-model="pdf.base.footer.start" />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.footer"
      :title="t('editor.pdf.base.footer.type')"
    >
      <InputSelect
        v-model="pdf.base.footer.textType"
        :arr="defines.pdf().base().footerStyle()"
      />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.footer"
      :title="t('editor.pdf.base.footer.alignment')"
    >
      <InputSelect
        v-model="pdf.base.footer.alignment"
        :arr="defines.pdf().base().alignment()"
      />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.footer"
      :title="t('editor.pdf.base.footer.size')"
    >
      <InputNumber v-model="pdf.base.footer.textSize" />
    </GeneratorItem>
    <GeneratorItem
      :disabled="!pdf.switcher.footer"
      :title="t('editor.pdf.base.footer.fontFamily')"
    >
      <InputSelect
        v-model="pdf.base.footer.fontFamily"
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
