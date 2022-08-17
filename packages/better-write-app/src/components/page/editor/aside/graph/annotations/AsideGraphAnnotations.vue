<template>
  <div
    class="flex justify-start items-center w-full mt-2.5 gap-1 text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active"
  >
    <div>
      <IconTextWrite class="w-7 h-7" />
    </div>
    <p
      :class="[PROJECT.base === 'annotations' ? '' : 'opacity-70']"
      class="cursor-pointer truncate font-bold"
      @click="PROJECT.base = 'annotations'"
    >
      {{ t('editor.aside.graph.annotations') }}
    </p>
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useCanvasTimeline } from '@/use/canvas/timeline'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const { t } = useI18n()
  const canvas = useCanvasTimeline()
</script>
