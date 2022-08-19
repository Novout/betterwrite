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
    <IconArrowRight
      :class="[value ? 'transform rotate-90' : '']"
      class="wb-icon w-7 h-7"
      @click.prevent.stop="toggle()"
    />
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { usePage } from '@/use/page'
  import { useProject } from '@/use/project'
  import { useI18n } from 'vue-i18n'

  defineProps<{
    value: boolean
    toggle: (value?: boolean | undefined) => boolean
  }>()

  const PROJECT = useProjectStore()

  const page = usePage()
  const project = useProject()
  const { t } = useI18n()
</script>
