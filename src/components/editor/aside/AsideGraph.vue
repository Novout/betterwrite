<template>
  <div class="flex flex-col mt-5 w-full p-1 wb-text">
    <div v-for="page in store.state.project.pages" :key="page.id">
      <div v-for="entity in page.page" :key="entity.id">
        <div
          v-if="entity.type === 'heading-one'"
          class="border-l border-black dark:border-gray-500 ml-1"
        >
          <p class="text-tiny ml-2 font-bold truncate cursor-pointer py-2">
            {{ entity.raw }}
          </p>
        </div>
        <div
          v-if="entity.type === 'heading-two'"
          class="flex items-end border-l border-black dark:border-gray-500 ml-1"
        >
          <div
            class="border-b mb-2 w-6 h-1 border-black dark:border-gray-500"
          ></div>
          <p class="text-sm ml-2 truncate cursor-pointer">{{ entity.raw }}</p>
        </div>
        <div
          v-if="entity.type === 'heading-three'"
          class="flex items-end border-l border-black dark:border-gray-500 ml-1"
        >
          <div
            class="border-b mb-2 w-10 h-1 border-black dark:border-gray-500"
          ></div>
          <p class="text-xs ml-2 truncate cursor-pointer">{{ entity.raw }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'

  const store = useStore()
</script>
