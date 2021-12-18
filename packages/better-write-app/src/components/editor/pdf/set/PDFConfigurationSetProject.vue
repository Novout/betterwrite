<template>
  <PDFConfigurationSlot v-if="!project.isBlankProject()">
    <template #title>
      <section class="flex gap-2">
        <h2 class="text-2xl ml-2 font-bold font-poppins">
          {{ t('editor.pdf.project.title') }}
        </h2>
        <TooltipIcon :tooltip="t('editor.pdf.project.tooltip.title')" />
      </section>
    </template>
    <section
      class="flex flex-row flex-wrap justify-between items-center my-3 overflow-x-hidden"
    >
      <div class="wb-input-container flex flex-wrap">
        <section class="flex items-center mx-2">
          <label class="mx-2 text-xs">{{
            t('editor.pdf.project.encryption.title')
          }}</label>
          <InputBoolean v-model="PDF.styles.switcher.encryption" />
        </section>
        <section
          :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
        >
          <label>{{ t('editor.pdf.project.encryption.user') }}</label>
          <InputText
            v-model="PROJECT.pdf.encryption.userPassword"
            class="bg-theme-transparent shadow-lg"
          />
        </section>
        <section
          :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
        >
          <label>{{ t('editor.pdf.project.encryption.owner') }}</label>
          <InputText
            v-model="PROJECT.pdf.encryption.ownerPassword"
            class="bg-theme-transparent shadow-lg"
          />
        </section>
      </div>
      <div class="wb-input-container">
        <section
          class="flex items-center"
          :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
        >
          <label>{{ t('editor.pdf.project.permissions.modifying') }}</label>
          <InputBoolean
            v-model="PROJECT.pdf.permissions.modifying"
            class="ml-2"
          />
        </section>
      </div>
      <div class="wb-input-container">
        <section
          class="flex items-center"
          :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
        >
          <label>{{ t('editor.pdf.project.permissions.copying') }}</label>
          <InputBoolean
            v-model="PROJECT.pdf.permissions.copying"
            class="ml-2"
          />
        </section>
      </div>
      <div class="wb-input-container">
        <section
          class="flex items-center"
          :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
        >
          <label>{{ t('editor.pdf.project.permissions.annotating') }}</label>
          <InputBoolean
            v-model="PROJECT.pdf.permissions.annotating"
            class="ml-2"
          />
        </section>
      </div>
      <div class="wb-input-container">
        <section
          class="flex items-center"
          :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
        >
          <label>{{ t('editor.pdf.project.permissions.fillingForms') }}</label>
          <InputBoolean
            v-model="PROJECT.pdf.permissions.fillingForms"
            class="ml-2"
          />
        </section>
      </div>
      <div class="wb-input-container">
        <section
          class="flex items-center"
          :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
        >
          <label>{{
            t('editor.pdf.project.permissions.contentAccessibility')
          }}</label>
          <InputBoolean
            v-model="PROJECT.pdf.permissions.contentAccessibility"
            class="ml-2"
          />
        </section>
      </div>
      <div class="wb-input-container">
        <section
          class="flex items-center"
          :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
        >
          <label>{{
            t('editor.pdf.project.permissions.documentAssembly')
          }}</label>
          <InputBoolean
            v-model="PROJECT.pdf.permissions.documentAssembly"
            class="ml-2"
          />
        </section>
      </div>
    </section>
  </PDFConfigurationSlot>
</template>

<script setup lang="ts">
  import { usePDFStore } from '@/store/pdf'
  import { useProjectStore } from '@/store/project'
  import { useProject } from '@/use/project'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()
  const PDF = usePDFStore()

  const { t } = useI18n()
  const project = useProject()
</script>
