<template>
  <GeneratorContainer>
    <GeneratorItem :title="t('editor.pdf.cover.type')">
      <InputBoolean v-model="PDF.styles.switcher.cover" />
    </GeneratorItem>
    <GeneratorItem
      v-if="PDF.styles.switcher.cover"
      :title="t('editor.pdf.cover.image')"
    >
      <InputFile
        id="cover-background"
        :src="pdf.base.background.data"
        @load="onCoverImageLoad"
        @exclude="onDeleteCoverImage"
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

  const onCoverImageLoad = (e: any) => {
    PDF.setCoverBackground(e)
  }

  const onDeleteCoverImage = () => {
    PDF.deleteCoverBackground()
  }
</script>
