<template>
  <FullModal :title="t('editor.bar.project.statistics')" @close="onClose">
    <div class="flex font-raleway justify-start flex-col flex-wrap gap-5">
      <div class="flex flex-wrap flex-col md:flex-row w-full">
        <EditorProjectStatisticsBase />
        <EditorProjectStatisticsImpact v-if="project.isCreativeProject()" />
      </div>
      <EditorProjectStatisticsWord />
    </div>
  </FullModal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProject } from '@/use/project'
  import { onClickOutside } from '@vueuse/core'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()
  const project = useProject()

  const { t } = useI18n()

  const statistics = ref<HTMLElement | null>(null)

  onClickOutside(statistics, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.project.statistics = false
  }
</script>
