<template>
  <div class="flex px-2 flex-col mt-5 w-full">
    <p
      v-if="!env.isEmptyProject(PROJECT.name)"
      class="cursor-pointer font-bold"
      @click="graph.base()"
    >
      {{ PROJECT.nameRaw }}
    </p>
    <div v-for="(page, index) in PROJECT.pages" :key="index">
      <div
        v-for="(entity, ind) in page.entities"
        :id="graph.normalize().id(page, ind)"
        :key="graph.normalize().key(page, ind)"
        @click="graph.to(ind, page)"
      >
        <AsideGraphItem :entity="entity" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useGraph } from '@/use/graph'

  const PROJECT = useProjectStore()

  const graph = useGraph()
  const env = useEnv()
</script>
