<template>
  <div class="flex justify-between items-center w-full mt-5">
    <p
      :class="[PROJECT.base === 'timeline' ? '' : 'opacity-70']"
      class="cursor-pointer truncate font-bold text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active"
      @click="canvas.externals().load()"
    >
      {{ t('editor.aside.graph.timeline') }}
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
