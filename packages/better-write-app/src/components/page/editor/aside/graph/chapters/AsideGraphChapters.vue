<template>
  <div
    :class="[PROJECT.base === 'chapter' ? '' : 'opacity-70']"
    class="flex justify-between items-center w-full"
  >
    <div
      class="flex truncate gap-1 items-center text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active"
    >
      <div>
        <IconOpenBook class="w-7 h-7" />
      </div>
      <p
        v-if="!env.isEmptyProject(PROJECT.name)"
        class="cursor-pointer truncate font-bold"
        @click="graph.base()"
      >
        {{
          CONTEXT.entities[0].raw
            ? CONTEXT.entities[0].raw
            : t('editor.aside.graph.chapters')
        }}
      </p>
    </div>
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
</template>

<script setup lang="ts">
  import { useContextStore } from '@/store/context'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useGraph } from '@/use/graph'
  import { useUtils } from '@/use/utils'
  import { computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const graph = useGraph()
  const env = useEnv()
  const { t } = useI18n()
  const utils = useUtils()

  const name = computed(() => PROJECT.nameRaw)

  watch(name, () => {
    PROJECT.name = utils.text().kebab(PROJECT.nameRaw)
  })
</script>
