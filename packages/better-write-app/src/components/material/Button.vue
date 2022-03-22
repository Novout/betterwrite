<template>
  <button
    class="bg-theme-background-2 hover:bg-theme-background-3 transition-colors rounded shadow my-5 px-5 py-1 wb-text text-base md:text-lg"
    @click.prevent.stop="onClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
  defineProps<{
    onClick: () => void
  }>()
</script>
