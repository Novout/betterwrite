<template>
  <transition @leave="(el, done) => motions.aside.leave(done)">
    <aside
      v-if="ABSOLUTE.aside"
      id="editor-aside"
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
      <AsideBarLogo />
      <AsideGraph />
    </aside>
  </transition>
</template>

<script lang="ts" setup>
  import { useAbsoluteStore } from '@/store/absolute'
  import { useMotions } from '@vueuse/motion'

  const ABSOLUTE = useAbsoluteStore()

  const motions = useMotions()

  const onClose = () => {
    ABSOLUTE.aside = false
  }
</script>
