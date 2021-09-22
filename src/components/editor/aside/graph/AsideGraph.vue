<template>
  <div class="flex flex-col mt-5 w-full p-1 wb-text">
    <p v-if="store.state.project.name !== '__NOT_CREATED__'">
      {{ store.state.project.nameRaw }}
    </p>
    <div v-for="(page, index) in store.state.project.pages" :key="index">
      <div
        v-for="entity in page.entity"
        :id="`graph-${page.id}-${entity.id}`"
        :key="`graph-${page.id}-${entity.id}`"
        @click="onClick(`#${entity.type + '-' + entity.id}`, page, entity.type)"
      >
        <AsideGraphItem :raw="entity.raw" :type="entity.type" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import { useScroll } from '@/use/scroll'
  import { ContextState } from '@/types/context'

  const store = useStore()

  const onClick = (go: string, page: ContextState, type: string) => {
    if (type === 'heading-one') {
      store.commit('context/load', page)
    }

    // useScroll().to(go)
  }
</script>
