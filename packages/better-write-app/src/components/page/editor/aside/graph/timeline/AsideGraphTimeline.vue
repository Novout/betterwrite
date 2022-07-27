<template>
  <div
    class="flex justify-start items-center w-full mt-5 gap-1 text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active"
  >
    <IconTimeline class="w-7 h-7" />
    <p
      :class="[PROJECT.base === 'timeline' ? '' : 'opacity-70']"
      class="cursor-pointer truncate font-bold"
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
