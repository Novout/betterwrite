<template>
  <section class="wb-base flex flex-col md:flex-row">
    <HeroIcon
      class="
        absolute
        flex
        justify-center
        items-center
        md:hidden
        visible
        z-50
        text-black
        dark:text-gray-500 dark:hover:text-gray-200
        bg-gray-200
        dark:bg-gray-800
        rounded-none
      "
      :class="open ? 'transform rotate-90 left-12' : ''"
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
      :class="!open ? 'hidden md:block' : ''"
      class="
        fixed
        md:relative
        h-screen
        w-auto
        md:w-60
        bg-white
        dark:bg-gray-700
        border-r border-gray-300
        dark:border-gray-700
      "
    >
      <AsideBar />
      <AsideGraph />
    </aside>
    <main class="flex-1 bg-wb-image dark:bg-wb-image-dark">
      <EditorBase />
    </main>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const open = ref(false)
</script>
