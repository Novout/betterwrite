<template>
  <transition>
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
        md:w-60
        bg-theme-aside-background
        hover:bg-theme-aside-background-hover
        active:bg-theme-aside-background-active
        z-aside
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

  const ABSOLUTE = useAbsoluteStore()
</script>
