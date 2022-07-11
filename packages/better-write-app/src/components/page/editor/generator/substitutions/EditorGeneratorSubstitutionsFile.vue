<template>
  <div class="flex items-center rounded-full w-90 gap-5 mt-5">
    <FileController :importer="importFile" :exporter="exportFile" />
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useFile } from '@/use/file'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

  const PROJECT = useProjectStore()

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
        if (
          Array.isArray(data.text) &&
          Array.isArray(data.italic) &&
          Array.isArray(data.bold)
        )
          PROJECT.templates.substitutions = data
        else toast.error(t('toast.generics.configurationFail'))
      })
      .catch(() => {})
  }

  const exportFile = () => {
    file.export(PROJECT.templates.substitutions, '-substitutions')
  }
</script>
