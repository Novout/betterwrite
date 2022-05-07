<template>
  <FileController :importer="importFile" :exporter="exportFile" />
</template>

<script setup lang="ts">
  import { usePDFStore } from '@/store/pdf'
  import { useFile } from '@/use/file'

  const PDF = usePDFStore()

  const file = useFile()

  const importFile = async () => {
    file
      .import({
        extensions: {
          'application/json': ['.json'],
        },
      })
      .then((data: any) => {
        if (data.base) PDF.styles = data
      })
      .catch(() => {})
  }

  const exportFile = () => {
    file.export(PDF.styles, '-pdf')
  }
</script>
