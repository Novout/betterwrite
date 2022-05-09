<template>
  <div
    class="flex flex-col w-full md:w-3/4 wb-text bg-theme-background-opacity-1 p-2 rounded-lg shadow-lg cursor-pointer my-2"
    @click.prevent.stop="toggle()"
  >
    <div class="flex items-center gap-2">
      <h2 class="pointer-events-none">{{ title }}</h2>
      <IconArrowRight
        :class="[value ? 'rotate-90' : 'rotate-0']"
        class="transform transition-transform wb-icon w-7 h-7"
      />
    </div>
    <div
      v-if="value"
      v-motion
      :initial="{
        opacity: 0,
        y: -20,
      }"
      :enter="{
        opacity: 1,
        y: 0,
      }"
      class="flex flex-col gap-3 w-full p-5"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useToggle } from '@vueuse/core'

  defineProps<{
    title: string
  }>()

  const [value, toggle] = useToggle()
</script>
