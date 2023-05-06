<template>
  <GeneratorContainer>
    <GeneratorItem :title="t('editor.pdf.note.title')">
      <InputTextArea
        v-model="PDF.styles.base.note.text"
        class="resize-none h-20 w-40 wb-scroll bg-theme-background-1 shadow-xl p-2 rounded-sm"
      />
    </GeneratorItem>
    <GeneratorItem
      :tooltip="t('editor.pdf.project.tooltip.title')"
      :title="t('editor.pdf.project.encryption.title')"
    >
      <InputBoolean v-model="PDF.styles.switcher.encryption" />
    </GeneratorItem>
    <GeneratorItem
      :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
      :title="t('editor.pdf.project.encryption.user')"
    >
      <InputText
        v-model="PROJECT.pdf.encryption.userPassword"
        class="shadow-lg bg-theme-background-opacity-1"
      />
    </GeneratorItem>
    <GeneratorItem
      :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
      :title="t('editor.pdf.project.encryption.owner')"
    >
      <InputText
        v-model="PROJECT.pdf.encryption.ownerPassword"
        class="shadow-lg bg-theme-background-opacity-1"
      />
    </GeneratorItem>
    <GeneratorItem
      :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
      :title="t('editor.pdf.project.permissions.modifying')"
    >
      <InputBoolean v-model="PROJECT.pdf.permissions.modifying" class="ml-2" />
    </GeneratorItem>
    <GeneratorItem
      :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
      :title="t('editor.pdf.project.permissions.copying')"
    >
      <InputBoolean v-model="PROJECT.pdf.permissions.copying" class="ml-2" />
    </GeneratorItem>
    <GeneratorItem
      :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
      :title="t('editor.pdf.project.permissions.annotating')"
    >
      <InputBoolean v-model="PROJECT.pdf.permissions.annotating" class="ml-2" />
    </GeneratorItem>
    <GeneratorItem
      :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
      :title="t('editor.pdf.project.permissions.fillingForms')"
    >
      <InputBoolean
        v-model="PROJECT.pdf.permissions.fillingForms"
        class="ml-2"
      />
    </GeneratorItem>
    <GeneratorItem
      :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
      :title="t('editor.pdf.project.permissions.contentAccessibility')"
    >
      <InputBoolean
        v-model="PROJECT.pdf.permissions.contentAccessibility"
        class="ml-2"
      />
    </GeneratorItem>
    <GeneratorItem
      :class="[!PDF.styles.switcher.encryption ? 'wb-disabled' : '']"
      :title="t('editor.pdf.project.permissions.documentAssembly')"
    >
      <InputBoolean
        v-model="PROJECT.pdf.permissions.documentAssembly"
        class="ml-2"
      />
    </GeneratorItem>
  </GeneratorContainer>
</template>

<script setup lang="ts">
  import { usePDFStore } from '@/store/pdf'
  import { useProjectStore } from '@/store/project'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const PDF = usePDFStore()
  const PROJECT = useProjectStore()
</script>
