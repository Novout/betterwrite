<template>
  <GeneratorContainer>
    <GeneratorItem>
      <section class="flex items-center">
        <label class="mx-2 text-xs">{{ t('editor.pdf.cover.type') }}</label>
        <InputBoolean v-model="pdf.switcher.summary" />
      </section>
      <section :class="[!pdf.switcher.summary ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.summary.type') }}</label>
        <InputSelect
          v-model="pdf.base.summary.type"
          :arr="useDefines().pdf().base().summaryStyle()"
        />
      </section>
      <section :class="[!pdf.switcher.summary ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.summary.fontSize') }}</label>
        <InputNumber v-model="pdf.base.summary.fontSize" />
      </section>
      <section :class="[!pdf.switcher.summary ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.summary.fontFamily') }}</label>
        <InputSelect
          v-model="pdf.base.summary.fontFamily"
          class="flex-1"
          :arr="PDF.fonts"
          :font="true"
        />
      </section>
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
