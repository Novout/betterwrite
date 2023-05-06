<template>
  <div
    :class="[PROJECT.base === 'annotations' ? '' : 'opacity-70']"
    class="flex justify-between items-center w-full mt-2.5 text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active"
  >
    <div class="flex items-center gap-1 pointer-events-none">
      <div>
        <IconTextWrite class="w-7 h-7" />
      </div>
      <p class="truncate font-bold">
        {{ t('editor.aside.graph.annotations') }}
      </p>
    </div>
    <div class="flex items-center gap-2">
      <div
        class="cursor-pointer"
        @click.prevent.stop="annotations.onFolderCreate()"
      >
        <IconFolderAdd class="wb-aside-icon" />
      </div>
    </div>
  </div>
  <AsideGraphAnnotationsList />
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useAnnotations } from '@/use/annotations'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const { t } = useI18n()
  const annotations = useAnnotations()
</script>
