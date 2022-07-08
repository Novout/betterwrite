<template>
  <GeneratorContainer>
    <GeneratorItem>
      <section class="flex items-center">
        <label class="mx-2 text-xs">{{ t('editor.pdf.cover.type') }}</label>
        <InputBoolean v-model="pdf.switcher.header" />
      </section>
      <section :class="[!pdf.switcher.header ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.header.start') }}</label>
        <InputNumber v-model="pdf.base.header.start" />
      </section>
      <section :class="[!pdf.switcher.header ? 'wb-disabled' : '']">
        <div>
          <p>{{ t('editor.pdf.base.header.content') }}</p>
          <InputText
            v-model="pdf.base.header.content"
            class="shadow-lg bg-theme-background-opacity-1"
          />
        </div>
      </section>
      <section :class="[!pdf.switcher.header ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.header.type') }}</label>
        <InputSelect
          v-model="pdf.base.header.textType"
          :arr="useDefines().pdf().base().footerStyle()"
        />
      </section>
      <section :class="[!pdf.switcher.header ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.header.alignment') }}</label>
        <InputSelect
          v-model="pdf.base.header.alignment"
          :arr="useDefines().pdf().base().alignment()"
        />
      </section>
      <section :class="[!pdf.switcher.header ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.header.size') }}</label>
        <InputNumber v-model="pdf.base.header.textSize" />
      </section>
      <section :class="[!pdf.switcher.header ? 'wb-disabled' : '']">
        <label>{{ t('editor.pdf.base.header.fontFamily') }}</label>
        <InputSelect
          v-model="pdf.base.header.fontFamily"
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
