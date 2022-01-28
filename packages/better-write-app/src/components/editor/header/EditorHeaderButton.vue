<template>
  <div @mouseleave="n = false" @mouseenter="n = true">
    <HeroIcon
      :style="{
        backgroundColor: props.color !== 'none' ? props.color : 'none',
      }"
      class="inline-flex wb-icon"
      :class="[n ? 'text-theme-icon-active' : '']"
    >
      <slot name="icon" />
    </HeroIcon>
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
