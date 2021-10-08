<template>
  <HeroIcon
    class="absolute justify-center items-center z-aside-open wb-icon rounded-br"
    :class="open ? 'left-60' : ''"
    @click="store.commit('absolute/switchAside', !open)"
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
      shadow-lg
    "
  >
    <AsideClose @close="onClose" />
    <AsideBar />
    <AsideGraph />
  </aside>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const open = computed(() => store.state.absolute.aside)

  const onClose = () => {
    store.commit('absolute/switchAside', false)
  }
</script>
