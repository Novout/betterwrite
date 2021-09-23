<template>
  <div
    class="flex justify-end items-center relative bg-gray-300 dark:bg-gray-800"
  >
    <HeroIcon class="wb-icon inline-flex" @click.prevent="onDeletePage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
        <path
          fill-rule="evenodd"
          d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
  </div>
</template>

<script setup lang="ts">
  import { nextTick } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const onDeletePage = async () => {
    if (store.state.project.pages.length <= 1) return

    store.commit('project/deletePage', store.state.context)
    await nextTick

    store.commit('context/load', store.state.project.pages[0])
  }
</script>
