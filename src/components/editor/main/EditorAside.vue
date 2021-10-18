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
  <transition @leave="(el, done) => motions.aside.leave(done)">
    <aside
      v-if="open"
      v-motion="'aside'"
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
      :initial="{
        x: -240,
      }"
      :enter="{
        x: 0,
      }"
      :leave="{
        x: -240,
      }"
    >
      <AsideClose @close="onClose" />
      <AsideBar />
      <AsideGraph />
    </aside>
  </transition>
</template>

<script lang="ts" setup>
  import { useMotions } from '@vueuse/motion'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const motions = useMotions()
  const open = computed(() => store.state.absolute.aside)

  const onClose = () => {
    store.commit('absolute/switchAside', false)
  }
</script>
