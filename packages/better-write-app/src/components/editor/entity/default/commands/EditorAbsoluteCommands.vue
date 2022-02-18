<template>
  <div
    class="flex mt-1 justify-between items-center w-full p-1 border border-theme-border-commands-1 text-theme-text-commands-1 rounded"
  >
    <HeroIcon class="text-sm">
      <slot name="icon" />
    </HeroIcon>
    <div class="flex flex-col items-end justify-end">
      <p v-if="!mobile">{{ props.title }}</p>
      <p class="text-2xs">{{ props.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

  const props = defineProps({
    title: String,
    description: String,
  })

  const breakpoints = useBreakpoints(breakpointsTailwind)

  const mobile = breakpoints.smaller('md')
</script>
