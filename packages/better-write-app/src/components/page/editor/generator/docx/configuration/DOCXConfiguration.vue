<template>
  <FullModal @close="ABSOLUTE.docx.configuration = false">
    <EditorAbsoluteHeader
      class="wb-text w-full"
      :title="'DOCX'"
      :force="true"
      @close="ABSOLUTE.docx.configuration = false"
    />
    <h2 class="my-10 break-words text-base sm:text-lg">
      {{ t('editor.characters.description') }}
    </h2>
    <div class="flex flex-col gap-10 w-full">
      <GeneratorToggle :title="t('generator.block.paragraph')">
        <DOCXConfigurationParagraph />
      </GeneratorToggle>
      <GeneratorToggle :title="t('generator.block.headingOne')">
        <DOCXConfigurationHeadingOne />
      </GeneratorToggle>
      <GeneratorToggle :title="t('generator.block.headingTwo')">
        <DOCXConfigurationHeadingTwo />
      </GeneratorToggle>
      <GeneratorToggle :title="t('generator.block.headingThree')">
        <DOCXConfigurationHeadingThree />
      </GeneratorToggle>
    </div>
  </FullModal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
</script>
