<template>
  <GeneratorContainer>
    <GeneratorItem>
      <section class="flex items-center">
        <label class="mx-2 text-xs">{{ t('editor.pdf.cover.type') }}</label>
        <InputBoolean v-model="pdf.switcher.footer" />
      </section>
      <section :class="[!pdf.switcher.footer ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.footer.start') }}</label>
        <InputNumber v-model="pdf.base.footer.start" />
      </section>
      <section :class="[!pdf.switcher.footer ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.footer.type') }}</label>
        <InputSelect
          v-model="pdf.base.footer.textType"
          :arr="useDefines().pdf().base().footerStyle()"
        />
      </section>
      <section :class="[!pdf.switcher.footer ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.footer.alignment') }}</label>
        <InputSelect
          v-model="pdf.base.footer.alignment"
          :arr="useDefines().pdf().base().alignment()"
        />
      </section>
      <section :class="[!pdf.switcher.footer ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.footer.size') }}</label>
        <InputNumber v-model="pdf.base.footer.textSize" />
      </section>
      <section :class="[!pdf.switcher.footer ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.footer.fontFamily') }}</label>
        <InputSelect
          v-model="pdf.base.footer.fontFamily"
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
