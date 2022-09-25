<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="0"
    class="flex font-raleway wb-scroll overflow-x-hidden flex-col justify-start items-start p-5 gap-5"
  >
    <div class="w-full">
      <EditorAbsoluteHeader
        class="wb-text"
        :title="'PDF'"
        :force="true"
        @close="ABSOLUTE.pdf.configuration = false"
      />
    </div>
    <div class="flex items-start flex-col my-5">
      <PDFConfigurationConfig class="h-10" />
      <PDFConfigurationPreview
        v-if="os !== 'Android' && os !== 'iOS' && os !== 'Mac OS'"
      />
    </div>
    <GeneratorToggle :value="false" :title="t('editor.pdf.project.title')">
      <PDFConfigurationEncryption />
    </GeneratorToggle>
    <GeneratorToggle
      :tooltip="t('editor.pdf.cover.tooltip')"
      :value="false"
      :title="t('editor.pdf.custom.title.cover')"
    >
      <PDFConfigurationCover />
    </GeneratorToggle>
    <GeneratorToggle
      :tooltip="t('editor.pdf.base.tooltip')"
      :value="false"
      :title="t('editor.pdf.base.title')"
    >
      <PDFConfigurationPage />
    </GeneratorToggle>
    <GeneratorToggle :value="false" :title="t('editor.pdf.base.summary.title')">
      <PDFConfigurationSummary />
    </GeneratorToggle>
    <GeneratorToggle :value="false" :title="t('editor.pdf.base.header.title')">
      <PDFConfigurationHeader />
    </GeneratorToggle>
    <GeneratorToggle :value="false" :title="t('editor.pdf.base.footer.title')">
      <PDFConfigurationFooter />
    </GeneratorToggle>
    <GeneratorToggle :value="false" :title="t('generator.block.paragraph')">
      <PDFConfigurationParagraph />
    </GeneratorToggle>
    <GeneratorToggle :value="false" :title="t('generator.block.headingOne')">
      <PDFConfigurationHeadingOne />
    </GeneratorToggle>
    <GeneratorToggle :value="false" :title="t('generator.block.headingTwo')">
      <PDFConfigurationHeadingTwo />
    </GeneratorToggle>
    <GeneratorToggle :value="false" :title="t('generator.block.headingThree')">
      <PDFConfigurationHeadingThree />
    </GeneratorToggle>
    <GeneratorToggle
      :value="false"
      :title="t('editor.pdf.custom.generics.lineBreak')"
    >
      <PDFConfigurationLineBreak />
    </GeneratorToggle>
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useUtils } from '@/use/utils'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
  const utils = useUtils()

  const os = utils.system().get()
</script>
