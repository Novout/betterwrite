<template>
  <div class="flex flex-1 gap-2 bg-theme-background-3 p-5">
    <p>{{ title }}</p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>
