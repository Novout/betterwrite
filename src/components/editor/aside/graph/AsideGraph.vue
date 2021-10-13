<template>
  <div class="flex px-2 flex-col mt-5 w-full wb-text">
    <p v-if="!env.isEmptyProject(project.name)">
      {{ project.nameRaw }}
    </p>
    <transition-group name="list" tag="div">
      <div v-for="(page, index) in project.pages" :key="index">
        <div
          v-for="(entity, ind) in page.entity"
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
  import { useEnv } from '@/use/env'
  import { useGraph } from '@/use/graph'
  import { computed } from '@vue/reactivity'
  import { useStore } from 'vuex'

  const graph = useGraph()
  const env = useEnv()

  const store = useStore()
  const project = computed(() => store.state.project)
</script>
