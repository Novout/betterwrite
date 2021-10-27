<template>
  <div @mouseleave="value = false" @mouseenter="value = true">
    <HeroIcon
      :style="{
        backgroundColor: props.color !== 'none' ? props.color : 'none',
      }"
      :class="[
        value
          ? 'text-gray-400 dark:text-white'
          : 'text-black dark:text-gray-500',
      ]"
      class="inline-flex no-drag"
    >
      <slot name="icon" />
    </HeroIcon>
    <EditorHeaderBar v-if="value">
      <slot name="bar" />
    </EditorHeaderBar>
  </div>
</template>

<script setup lang="ts">
  import { useToggle } from '@vueuse/core'

  const [value, toggle] = useToggle()

  const props = defineProps({
    color: {
      required: false,
      type: String,
      default: 'none',
    },
  })
</script>
