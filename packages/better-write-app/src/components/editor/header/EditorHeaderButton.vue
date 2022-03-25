<template>
  <div @mouseleave="n = false" @mouseenter="n = true">
    <p
      :style="{
        backgroundColor: props.color !== 'none' ? props.color : 'none',
      }"
      class="wb-header-button"
      :class="[n ? 'text-theme-icon-active' : '']"
    >
      <div class="flex items-center pointer-events-none">
        <HeroIcon class="h-8 w-8 md:(w-6 h-6) mr-0 md:mr-1">
          <slot name="icon" />
        </HeroIcon>
        <p class="hidden md:flex">
          <slot name="text" />
        </p>
      </div>
    </p>
    <EditorHeaderBar v-if="n">
      <slot name="bar" />
    </EditorHeaderBar>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'

  const [n] = useToggle()

  const props = defineProps({
    color: {
      required: false,
      type: String,
      default: 'none',
    },
  })
</script>
