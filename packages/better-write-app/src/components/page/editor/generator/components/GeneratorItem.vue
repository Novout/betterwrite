<template>
  <div
    class="flex items-center justify-around flex-1 gap-2 bg-theme-background-3 p-5 rounded-lg shadow-lg"
  >
    <p>{{ title }}</p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>
