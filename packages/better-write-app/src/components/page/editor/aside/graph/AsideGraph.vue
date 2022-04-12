<template>
  <div class="flex px-2 flex-col w-full">
    <div class="flex flex-row-reverse items-center justify-between mb-5 mt-2">
      <IconGraphClose
        v-if="PROJECT.type === 'creative'"
        class="wb-icon w-12 h-12 md:(w-9 h-9)"
        @click.prevent.stop="ABSOLUTE.aside = false"
      />
      <p
        class="wb-text font-bold font-raleway w-2/3 text-left truncate pointer-events-none"
      >
        {{ PROJECT.nameRaw }}
      </p>
    </div>
    <div class="flex justify-between items-center w-full">
      <p
        v-if="!env.isEmptyProject(PROJECT.name)"
        class="cursor-pointer truncate font-bold text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active"
        @click="graph.base()"
      >
        {{ t('editor.aside.graph.chapters') }}
      </p>
      <AsideGraphControl v-if="!env.isEmptyProject(PROJECT.name)" />
    </div>
    <div v-for="(page, index) in PROJECT.pages" :key="index">
      <div
        v-for="(entity, ind) in page.entities"
        :id="graph.normalize().id(page, ind)"
        :key="graph.normalize().key(page, ind)"
        @click="graph.to(ind, page, entity)"
      >
        <AsideGraphItem :entity="entity" :page="page" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useGraph } from '@/use/graph'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()
  const ABSOLUTE = useAbsoluteStore()

  const graph = useGraph()
  const env = useEnv()
  const { t } = useI18n()
</script>
