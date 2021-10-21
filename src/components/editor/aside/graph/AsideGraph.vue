<template>
  <div class="flex px-2 flex-col mt-5 w-full wb-text">
    <p v-if="!env.isEmptyProject(PROJECT.name)">
      {{ PROJECT.nameRaw }}
    </p>
    <transition-group name="list" tag="div">
      <div v-for="(page, index) in PROJECT.pages" :key="index">
        <div
          v-for="(entity, ind) in page.entities"
          :id="`graph-${page.id}-${String(ind)}`"
          :key="`graph-${page.id}-${String(ind)}`"
          @click="graph.load(`#entity-${String(ind)}`, page)"
        >
          <AsideGraphItem :raw="entity.raw" :type="entity.type" />
        </div>
      </div>
    </transition-group>
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
