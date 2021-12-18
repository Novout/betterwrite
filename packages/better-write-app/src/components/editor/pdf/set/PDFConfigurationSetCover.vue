<template>
  <PDFConfigurationSlot v-if="!project.isBlankProject()">
    <template #title>
      <section class="flex gap-2">
        <h2 class="text-2xl ml-2 font-bold font-poppins">
          {{ t('editor.pdf.custom.title.cover') }}
        </h2>
        <TooltipIcon :tooltip="t('editor.pdf.cover.tooltip')" />
      </section>
    </template>
    <div
      class="flex flex-row flex-wrap justify-start items-center my-3 overflow-x-hidden"
    >
      <div class="wb-input-container justify-start">
        <label class="mx-2 text-xs">{{ t('editor.pdf.cover.type') }}</label>
        <InputBoolean v-model="PDF.styles.switcher.cover" />
        <InputFile
          v-if="PDF.styles.switcher.cover"
          id="cover-background"
          :src="pdf.base.background.data"
          @load="onCoverImageLoad"
          @exclude="onDeleteCoverImage"
        />
      </div>
    </div>
  </PDFConfigurationSlot>
</template>

<script setup lang="ts">
  import { usePDFStore } from '@/store/pdf'
  import { useProject } from '@/use/project'
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PDF = usePDFStore()

  const { t } = useI18n()
  const project = useProject()

  const pdf = computed(() => PDF.styles)

  const onCoverImageLoad = (e: any) => {
    PDF.setCoverBackground(e)
  }

  const onDeleteCoverImage = () => {
    PDF.deleteCoverBackground()
  }
</script>
