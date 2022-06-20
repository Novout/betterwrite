<template>
  <FileController :importer="importFile" :exporter="exportFile" />
</template>

<script setup lang="ts">
  import { useDOCXStore } from '@/store/docx'
  import { useFile } from '@/use/file'

  const DOCX = useDOCXStore()

  const file = useFile()

  const importFile = async () => {
    file
      .import({
        extensions: {
          'application/json': ['.json'],
        },
      })
      .then((data: any) => {
        if (data.base) DOCX.$state = data
      })
      .catch(() => {})
  }

  const exportFile = () => {
    file.export(DOCX.$state, '-docx')
  }
</script>
