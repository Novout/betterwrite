<template>
  <div class="w-full h-4 rounded-xl bg-theme-background-opacity-1">
    <div
      class="rounded-xl h-4 bg-theme-background-3"
      :style="{ width: `${width}%` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    width: number
  }>()
</script>
