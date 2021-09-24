<template>
  <HeroIcon
    class="
      absolute
      flex
      justify-center
      items-center
      z-aside-open
      text-black
      dark:text-gray-500 dark:hover:text-gray-200
      bg-gray-200
      dark:bg-gray-800
      rounded-none
    "
    :class="
      open ? 'transform rotate-90 left-32 md:left-40 lg:left-50 xl:left-60' : ''
    "
    @click="open = !open"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 5l7 7-7 7M5 5l7 7-7 7"
      />
    </svg>
  </HeroIcon>
  <aside
    v-if="open"
    :class="!open ? 'left-32 md:-left-40 lg:-left-50 xl:-left-60' : ''"
    class="
      fixed
      md:relative
      h-screen
      max-h-screen
      overflow-y-auto
      w-32
      md:w-40
      lg:w-50
      xl:w-60
      bg-white
      z-aside
      dark:bg-gray-700
      border-r border-gray-300
      dark:border-gray-700
    "
  >
    <AsideBar />
    <AsideGraph />
  </aside>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const open = ref(false)
</script>
