<template>
  <div class="flex px-2 flex-col mt-5 w-full wb-text">
    <p v-if="store.state.project.name !== '__NOT_CREATED__'">
      {{ store.state.project.nameRaw }}
    </p>
    <transition-group name="list" tag="div">
      <div v-for="(page, index) in store.state.project.pages" :key="index">
        <div
          v-for="(entity, ind) in page.entity"
          :id="`graph-${page.id}-${String(ind)}`"
          :key="`graph-${page.id}-${String(ind)}`"
          @click="onClick(`#entity-${String(ind)}`, page)"
        >
          <AsideGraphItem :raw="entity.raw" :type="entity.type" />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import { useScroll } from '@/use/scroll'
  import { ContextState } from '@/types/context'
  import { nextTick } from 'vue'

  const store = useStore()

  const onClick = async (go: string | symbol, page: ContextState) => {
    store.commit('context/load', page)
    await nextTick
    useScroll().to(String(go))
  }
</script>
