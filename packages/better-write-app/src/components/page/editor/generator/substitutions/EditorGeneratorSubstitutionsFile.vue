<template>
  <div class="flex items-center rounded-full w-90 gap-5 mt-5">
    <IconGear class="w-6 h-6" />
    <div class="flex gap-2">
      <Button @click.prevent.stop="importFile"> Importar </Button>
      <Button @click.prevent.stop="exportFile"> Exportar </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import destr from 'destr'
  import { saveAs } from 'file-saver'
  import { useProjectStore } from '@/store/project'
  import { useStorage } from '@/use/storage/storage'
  import { useFileSystemAccess } from '@vueuse/core'
  import { ProjectStateTemplatesSubstitutions } from 'better-write-types'

  const PROJECT = useProjectStore()

  const storage = useStorage()

  const importFile = async () => {
    const res = useFileSystemAccess({
      types: [
        {
          description: 'Better Write',
          accept: {
            'application/json': ['.json'],
          },
        },
      ],
      excludeAcceptAllOption: true,
    })

    try {
      await res.open()
    } catch (e) {
      return
    }

    const data = destr(res.data.value) as ProjectStateTemplatesSubstitutions

    if (
      Array.isArray(data.text) &&
      Array.isArray(data.italic) &&
      Array.isArray(data.bold)
    )
      PROJECT.templates.substitutions = data
  }

  const exportFile = async () => {
    await storage.normalize()

    saveAs(
      new Blob([JSON.stringify(PROJECT.templates.substitutions)], {
        type: 'application/json;charset=utf-8',
      }),
      PROJECT.name + '-substitutions'
    )
  }
</script>
