<template>
  <HeroIcon
    id="__GSAP__aside__button"
    class="
      absolute
      justify-center
      items-center
      z-aside-open
      text-black
      dark:text-gray-500 dark:hover:text-gray-200
      bg-gray-200
      dark:bg-gray-800
      rounded-br
    "
    :class="open ? 'left-60' : ''"
    @click="store.commit('absolute/switchAside', !open.value)"
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
  <transition name="fade" mode="out-in" appear>
    <aside
      v-if="open"
      class="
        fixed
        md:relative
        h-screen
        max-h-screen
        overflow-y-auto
        w-full
        sm:w-60
        bg-gray-100
        z-aside
        dark:bg-gray-700
      "
    >
      <AsideClose @close="store.commit('absolute/switchAside', false)" />
      <AsideBar />
      <AsideGraph />
    </aside>
  </transition>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const open = computed(() => store.state.absolute.aside)
</script>
