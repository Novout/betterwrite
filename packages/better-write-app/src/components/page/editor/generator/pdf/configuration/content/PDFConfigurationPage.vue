<template>
  <GeneratorContainer>
    <GeneratorItem :title="t('editor.pdf.theme.title')">
      <InputBoolean v-model="PDF.styles.switcher.theme" />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.base.backgroundColor.title')">
      <InputColorPicker v-model="pdf.base.background.color" />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.cover.image')">
      <InputBoolean v-model="PDF.styles.switcher.main" />
      <InputFile
        v-if="PDF.styles.switcher.main"
        id="main-background"
        :title="t('generics.input.image')"
        :src="pdf.base.background.main"
        @load="onMainImageLoad"
        @exclude="onDeleteMainImage"
      />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.base.pageSize')">
      <InputSelect
        v-model="pdf.base.pageSize"
        class="flex-1"
        :arr="defines.pdf().base().pageSize()"
      />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.base.pageOrientation')">
      <InputSelect
        v-model="pdf.base.pageOrientation"
        class="flex-1"
        :arr="defines.pdf().base().pageOrientation()"
      />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.base.pageMargins.title')">
      <section>
        <section>
          <label>{{ t('editor.pdf.base.pageMargins.left') }}</label>
          <InputNumber v-model="pdf.base.pageMargins.left" />
        </section>
        <section>
          <label>{{ t('editor.pdf.base.pageMargins.top') }}</label>
          <InputNumber v-model="pdf.base.pageMargins.top" />
        </section>
      </section>
      <section>
        <section>
          <label>{{ t('editor.pdf.base.pageMargins.right') }}</label>
          <InputNumber v-model="pdf.base.pageMargins.right" />
        </section>
        <section>
          <label>{{ t('editor.pdf.base.pageMargins.bottom') }}</label>
          <InputNumber v-model="pdf.base.pageMargins.bottom" />
        </section>
      </section>
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.note.title')">
      <InputTextArea
        v-model="PDF.styles.base.note.text"
        class="resize-none h-30 w-50 wb-scroll bg-theme-background-opacity-1 shadow-xl p-2 rounded-sm"
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

  const onMainImageLoad = (e: any) => {
    PDF.setMainBackground(e)
  }

  const onDeleteMainImage = () => {
    PDF.deleteMainBackground()
  }
</script>
