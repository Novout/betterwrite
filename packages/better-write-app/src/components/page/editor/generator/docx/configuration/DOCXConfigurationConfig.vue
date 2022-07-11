<template>
  <FileController :importer="importFile" :exporter="exportFile" />
</template>

<script setup lang="ts">
  import { useDOCXStore } from '@/store/docx'
  import { useFile } from '@/use/file'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

  const DOCX = useDOCXStore()

  const file = useFile()
  const toast = useToast()
  const { t } = useI18n()

  const importFile = async () => {
    file
      .import({
        extensions: {
          'application/json': ['.json'],
        },
      })
      .then((data: any) => {
        if (data.base) DOCX.$state = data
        else toast.error(t('toast.generics.configurationFail'))
      })
      .catch(() => {})
  }

  const exportFile = () => {
    file.export(DOCX.$state, '-docx')
  }
</script>
