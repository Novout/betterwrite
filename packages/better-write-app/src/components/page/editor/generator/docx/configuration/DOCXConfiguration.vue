<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="0"
    class="flex wb-scroll overflow-x-hidden flex-col justify-start items-start p-5 gap-5"
  >
    <div class="w-full">
      <EditorAbsoluteHeader
        class="wb-text"
        :title="'DOCX'"
        @close="ABSOLUTE.docx.configuration = false"
      />
      <GeneratorToggle
        :title="t('generator.flow.title')"
        :tooltip="t('generator.flow.tooltip')"
        :value="true"
      >
        <DOCXConfigurationFlow />
      </GeneratorToggle>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
</script>
