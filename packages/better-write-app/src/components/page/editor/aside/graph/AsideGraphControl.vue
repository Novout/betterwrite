<template>
  <div v-if="project.isCreativeProject()" class="flex items-center">
    <IconAdd
      class="wb-icon w-6 h-6"
      @click.prevent.stop="
        page.onCreatePage(
          t('editor.project.control.title', {
            suffix: PROJECT.totalPagesCreated + 1,
          })
        )
      "
    />
    <IconUp class="wb-icon w-6 h-6" @click.prevent.stop="page.onUpPage" />
    <IconDown class="wb-icon w-6 h-6" @click.prevent.stop="page.onDownPage" />
    <IconTrash
      class="wb-icon w-6 h-6"
      @click.prevent.stop="page.onDeletePage"
    />
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { usePage } from '@/use/page'
  import { useProject } from '@/use/project'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const page = usePage()
  const project = useProject()
  const { t } = useI18n()
</script>
