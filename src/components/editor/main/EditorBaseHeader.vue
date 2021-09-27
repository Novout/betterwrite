<template>
  <div
    class="flex justify-end items-center relative bg-gray-300 dark:bg-gray-800"
  >
    <HeroIcon
      class="wb-icon inline-flex"
      @click.prevent="usePage(store).onCreatePage"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
    <HeroIcon
      class="wb-icon inline-flex"
      @click.prevent="usePage(store).onDeletePage"
    >
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
  import { usePage } from '@/use/page'
  import { useStore } from 'vuex'

  const store = useStore()
</script>
