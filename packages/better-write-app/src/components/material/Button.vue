<template>
  <button
    class="flex items-center gap-2 bg-theme-background-opacity-1 transition-colors rounded shadow my-5 px-5 py-1 wb-text text-base md:text-lg"
    @click.prevent.stop="onClick"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
  defineProps<{
    onClick: () => void
  }>()
</script>
