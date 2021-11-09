<template>
  <PDFConfigurationSlot v-if="!project.isBlankProject()">
    <template #title>
      <h2 class="text-2xl ml-2 font-bold font-poppins">
        {{ t('editor.pdf.custom.title.cover') }}
      </h2>
    </template>
    <div
      class="
        flex flex-row flex-wrap
        justify-start
        items-center
        my-3
        overflow-x-hidden
      "
    >
      <div class="wb-input-container justify-start">
        <label class="mx-2 text-xs">{{ t('editor.pdf.cover.type') }}</label>
        <InputBoolean v-model="switcher.cover" />
        <InputFile
          v-if="switcher.cover"
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
  import { reactive, computed } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PDF = usePDFStore()

  const { t } = useI18n()
  const project = useProject()

  const pdf = computed(() => PDF.styles)

  const switcher = reactive({
    cover: PDF.styles.switcher.cover,
    main: PDF.styles.switcher.main,
  })

  const onCoverImageLoad = (e: any) => {
    PDF.setCoverBackground(e)
  }

  const onDeleteCoverImage = () => {
    PDF.deleteCoverBackground()
  }
</script>
