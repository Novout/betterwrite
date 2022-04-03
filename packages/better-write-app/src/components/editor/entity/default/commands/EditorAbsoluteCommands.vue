<template>
  <div
    ref="command"
    class="flex flex-col mt-1 justify-between items-start w-full p-3 hover:bg-theme-background-opacity-1 text-theme-text-commands-1 transition-colors"
  >
    <div class="flex items-center w-full justify-between">
      <HeroIcon class="text-sm">
        <slot name="icon" />
      </HeroIcon>
      <p class="text-sm font-poppins font-bold pointer-events-none">
        /{{ props.tag }}
      </p>
    </div>
    <div
      v-if="hover"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0,
          duration: 400,
        },
      }"
      class="border border-theme-border-1 p-2 mt-2 w-full rounded-lg"
    >
      {{ props.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useElementHover } from '@vueuse/core'
  import { ref } from 'vue'

  const props = defineProps({
    tag: String,
    content: String,
  })

  const command = ref()

  const hover = useElementHover(command)
</script>
