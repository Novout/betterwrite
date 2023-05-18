<template>
  <div
    :class="[PROJECT.base === 'annotations' ? '' : 'opacity-70']"
    class="flex justify-between items-center w-full mt-5 mb-2.5 text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active"
  >
    <div class="flex items-center gap-1 pointer-events-none">
      <div>
        <IconTextWrite class="w-7 h-7" />
      </div>
      <p class="truncate font-bold">
        {{ t('editor.aside.graph.schemas') }}
      </p>
    </div>
    <div class="flex items-center gap-2">
      <div
        class="cursor-pointer"
        @click.prevent.stop="ABSOLUTE.schemas.create = true"
      >
        <IconAdd class="wb-icon h-7 w-7" />
      </div>
    </div>
  </div>
  <AsideGraphSchemaList v-for="(schema, index) in PROJECT.schemas" :key="index" :schema="schema" />
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()
  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
</script>
