<template>
  <div class="flex items-center rounded-full w-90 gap-5 mt-5">
    <FileController :importer="importFile" :exporter="exportFile" />
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useFile } from '@/use/file'

  const PROJECT = useProjectStore()

  const file = useFile()

  const importFile = async () => {
    file
      .import({
        extensions: {
          'application/json': ['.json'],
        },
      })
      .then((data: any) => {
        if (
          Array.isArray(data.text) &&
          Array.isArray(data.italic) &&
          Array.isArray(data.bold)
        )
          PROJECT.templates.substitutions = data
      })
      .catch(() => {})
  }

  const exportFile = () => {
    file.export(PROJECT.templates.substitutions, '-substitutions')
  }
</script>
