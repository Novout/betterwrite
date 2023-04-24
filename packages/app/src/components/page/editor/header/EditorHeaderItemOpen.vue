<template>
  <div
    class="flex px-2 py-1 md:py-0.5 justify-between items-center w-full text-theme-editor-header-list-text hover:text-theme-editor-header-list-text-hover active:text-theme-editor-header-list-text-active hover:bg-theme-editor-header-list-background-hover active:bg-theme-editor-header-list-background-active"
    @mouseleave="open = false"
    @mouseenter="open = true"
  >
    <div class="flex">
      <slot name="icon"></slot>
      <p class="text-sm ml-2">{{ props.text }}</p>
    </div>
    <div class="flex justify-between w-full">
      <p class="font-tiny rounded-full px-1 text-3xs">
        {{ props.shortcut }}
      </p>
      <HeroIcon class="wb-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="w-6 h-6"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="m10 17l5-5l-5-5v10z"></path>
        </svg>
      </HeroIcon>
    </div>
    <div
      v-if="open"
      v-motion
      :initial="{ y: -15 }"
      :enter="{
        y: 0,
        transition: {
          delay: 0,
          duration: 150,
        },
      }"
      class="absolute left-48 md:left-52 lg:left-72"
    >
      <slot name="open" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const props = defineProps({
    text: {
      required: true,
      type: String,
    },
    shortcut: {
      required: false,
      type: String,
      default: '',
    },
    divider: {
      required: false,
      type: Boolean,
      default: false,
    },
  })

  const open = ref<boolean>(false)
</script>
