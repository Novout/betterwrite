<template>
  <div
    class="flex max-h-full md:max-h-96 flex-1 flex-col w-full p-3 shadow-lg overflow-y-auto"
  >
    <h2 class="font-bold font-poppins text-lg mb-5">
      {{ t('editor.addons.statistics.impact') }}
    </h2>
    <EditortProjectStatisticsImpactRow
      v-for="(chapter, index) in PROJECT.pages"
      :key="index"
      :title="chapter.entities[0]?.raw || chapter.title"
      :value="project.utils().getChapterImpact(chapter)"
    />
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useProject } from '@/use/project'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const project = useProject()

  const { t } = useI18n()
</script>
