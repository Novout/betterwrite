<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="50"
    class="flex max-h-full md:max-h-96 flex-1 flex-col w-full p-3 shadow-lg overflow-y-auto wb-scroll"
  >
    <h2 class="font-bold font-poppins text-lg mb-5">
      {{ t('editor.addons.statistics.impact') }}
    </h2>
    <EditorProjectStatisticsImpactRow
      v-for="(chapter, index) in PROJECT.chapters"
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
