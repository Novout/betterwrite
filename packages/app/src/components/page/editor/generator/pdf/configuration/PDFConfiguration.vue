<template>
  <FullModal @close="ABSOLUTE.pdf.configuration = false">
    <EditorAbsoluteHeader
      class="wb-text"
      :title="'PDF'"
      @close="ABSOLUTE.pdf.configuration = false"
    />
    <div class="flex items-start flex-col my-5">
      <PDFConfigurationConfig class="h-10" />
      <PDFConfigurationPreview
        v-if="os !== 'Android' && os !== 'iOS' && os !== 'Mac OS'"
      />
    </div>
    <div class="flex flex-col gap-10">
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
      <GeneratorToggle
        :value="false"
        :title="t('editor.pdf.base.summary.title')"
      >
        <PDFConfigurationSummary />
      </GeneratorToggle>
      <GeneratorToggle
        :value="false"
        :title="t('editor.pdf.base.header.title')"
      >
        <PDFConfigurationHeader />
      </GeneratorToggle>
      <GeneratorToggle
        :value="false"
        :title="t('editor.pdf.base.footer.title')"
      >
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
      <GeneratorToggle
        :value="false"
        :title="t('generator.block.headingThree')"
      >
        <PDFConfigurationHeadingThree />
      </GeneratorToggle>
      <GeneratorToggle
        :value="false"
        :title="t('editor.pdf.custom.generics.lineBreak')"
      >
        <PDFConfigurationLineBreak />
      </GeneratorToggle>
    </div>
  </FullModal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useUtils } from '@/use/utils'
  import { usePlugin } from 'better-write-plugin-core'
  import { useI18n } from 'vue-i18n'
  import { onMounted } from 'vue'

  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
  const utils = useUtils()
  const plugin = usePlugin()

  const os = utils.system().get()

  onMounted(() => {
    plugin.emit('plugin-pdf-init')
  })
</script>
