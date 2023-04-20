<template>
  <div
    :class="[PROJECT.base === 'chapter' ? '' : 'opacity-70']"
    class="flex justify-between items-center w-full"
  >
    <div
      class="cursor-pointer flex truncate gap-1 items-center text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active"
      @click="graph.base()"
    >
      <div>
        <IconOpenBook class="w-7 h-7" />
      </div>
      <p
        v-if="!env.isEmptyProject(PROJECT.name)"
        class="ml-1 truncate font-bold"
      >
        {{
          CONTEXT.entities[0].raw
            ? CONTEXT.entities[0].raw
            : t('editor.aside.graph.chapters')
        }}
      </p>
    </div>
    <AsideGraphControl
      v-if="!env.isEmptyProject(PROJECT.name)"
      :toggle="toggle"
      :value="value"
    />
  </div>
  <div v-for="(chapter, index) in chapters" v-if="value" :key="index">
    <div
      v-for="(entity, ind) in chapter.entities"
      :id="graph.normalize().id(chapter, ind)"
      :key="graph.normalize().key(chapter, ind)"
      @click="graph.to(ind, chapter, entity)"
    >
      <AsideGraphItem :entity="entity" :page="chapter" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useContextStore } from '@/store/context'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useGraph } from '@/use/graph'
  import { useUtils } from '@/use/utils'
  import { useToggle } from '@vueuse/core'
  import { computed, watch } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const graph = useGraph()
  const env = useEnv()
  const { t } = useI18n()
  const utils = useUtils()
  const [value, toggle] = useToggle(true)

  const name = computed(() => PROJECT.nameRaw)
  const chapters = computed(() => PROJECT.chapters)

  watch(name, () => {
    PROJECT.name = utils.text().kebab(PROJECT.nameRaw)
  })
</script>
