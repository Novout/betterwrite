<template>
  <div
    class="flex justify-end items-center relative bg-gray-300 dark:bg-gray-800"
  >
    <HeroIcon class="wb-icon inline-flex" @click.prevent="onSwitcher">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm1 8a1 1 0 100 2h6a1 1 0 100-2H7z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
    <HeroIcon class="wb-icon inline-flex" @click.prevent="onFinder">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z"
        />
        <path
          fill-rule="evenodd"
          d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
          clip-rule="evenodd"
        />
      </svg>
    </HeroIcon>
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

  const onFinder = () => {
    store.commit(
      'absolute/switchShortcutFinder',
      !store.state.absolute.shortcuts.finder
    )
  }

  const onSwitcher = () => {
    store.commit(
      'absolute/switchShortcutSwitcher',
      !store.state.absolute.shortcuts.switcher
    )
  }
</script>
