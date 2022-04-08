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
      class="mt-2 w-full rounded-lg text-xs break-words"
    >
      {{ props.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    tag: String,
    content: String,
  })
</script>
