<template>
  <div
    class="flex flex-col bg-theme-background-opacity-1 w-full p-5 wb-text shadow-lg"
  >
    <div
      class="flex items-center justify-between w-full cursor-pointer"
      @click.prevent.stop="toggle()"
    >
      <div class="flex gap-2 items-center">
        <h2 class="font-bold font-poppins text-xl pointer-events-none">
          {{ title }}
        </h2>
        <TooltipIcon v-if="tooltip" :tooltip="tooltip" />
      </div>
      <IconArrowRight
        :class="[v ? 'transform rotate-90' : '']"
        class="wb-icon w-9 h-9 transition-all"
      />
    </div>
    <div
      v-if="v"
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0,
          duration: 300,
        },
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useToggle } from '@vueuse/core'

  const { title, tooltip, value } = defineProps<{
    title?: string
    tooltip?: string
    value: boolean
  }>()

  const [v, toggle] = useToggle(value)
</script>
