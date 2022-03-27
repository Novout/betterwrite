<template>
  <div class="flex px-2 flex-col w-full">
    <HeroIcon
      v-if="PROJECT.type === 'creative'"
      class="relative right-1 wb-icon w-9 h-9 mb-5"
      @click.prevent.stop="ABSOLUTE.aside = false"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z"
        ></path>
        <path
          fill="currentColor"
          d="m11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"
        ></path>
      </svg>
    </HeroIcon>
    <div class="flex items-center w-full">
      <p
        v-if="!env.isEmptyProject(PROJECT.name)"
        class="cursor-pointer font-bold text-theme-aside-graph-text hover:text-theme-aside-graph-text-hover active:text-theme-aside-graph-text-active"
        @click="graph.base()"
      >
        {{ PROJECT.nameRaw }}
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

  const PROJECT = useProjectStore()
  const ABSOLUTE = useAbsoluteStore()

  const graph = useGraph()
  const env = useEnv()
</script>
