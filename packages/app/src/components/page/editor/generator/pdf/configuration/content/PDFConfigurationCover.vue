<template>
  <GeneratorContainer>
    <GeneratorItem :title="t('editor.pdf.cover.type')">
      <InputBoolean v-model="PDF.styles.switcher.cover" />
    </GeneratorItem>
    <GeneratorItem
      v-if="PDF.styles.switcher.cover"
      :title="t('editor.pdf.cover.image')"
    >
      <InputFileImage
        :src="PDF.styles.base.background.data"
        @load="onCoverImageLoad"
        @exclude="onDeleteCoverImage"
      />
    </GeneratorItem>
  </GeneratorContainer>
</template>

<script setup lang="ts">
  import { usePDFStore } from '@/store/pdf'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const PDF = usePDFStore()

  const onCoverImageLoad = (e: any) => {
    PDF.setCoverBackground(e)
  }

  const onDeleteCoverImage = () => {
    PDF.deleteCoverBackground()
  }
</script>
