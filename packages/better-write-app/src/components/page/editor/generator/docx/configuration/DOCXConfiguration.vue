<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="0"
    class="flex font-raleway wb-scroll overflow-x-hidden flex-col justify-start items-start p-5 gap-10"
  >
    <EditorAbsoluteHeader
      class="wb-text w-full"
      :title="'DOCX'"
      :force="true"
      @close="ABSOLUTE.docx.configuration = false"
    />
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
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
</script>
