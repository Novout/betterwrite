<template>
  <GeneratorContainer>
    <GeneratorItem :title="t('editor.pdf.lineBreak.spacing')">
      <InputNumber v-model="pdf.lineBreak.spacing" />
    </GeneratorItem>
    <GeneratorItem :title="t('editor.pdf.cover.image')">
      <InputBoolean v-model="pdf.lineBreak.image.active" />
      <InputFileImage
        v-if="pdf.lineBreak.image.active"
        :src="pdf.lineBreak.image.data"
        @load="onMainImageLoad"
        @exclude="onDeleteMainImage"
      />
    </GeneratorItem>
    <GeneratorItem
      v-if="pdf.lineBreak.image.active"
      :title="t('editor.pdf.lineBreak.size')"
    >
      <section>
        <label>{{ t('editor.pdf.custom.image.width') }}</label>
        <InputNumber v-model="pdf.lineBreak.image.width" :step="25" />
      </section>
      <section>
        <label>{{ t('editor.pdf.custom.image.height') }}</label>
        <InputNumber v-model="pdf.lineBreak.image.height" :step="25" />
      </section>
    </GeneratorItem>
  </GeneratorContainer>
</template>

<script setup lang="ts">
  import { usePDFStore } from '@/store/pdf'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const PDF = usePDFStore()

  const pdf = computed(() => PDF.styles)

  const onMainImageLoad = (e: any) => {
    PDF.styles.lineBreak.image.data = e
  }

  const onDeleteMainImage = () => {
    PDF.styles.lineBreak.image.data = ''
  }
</script>
