<template>
  <div class="flex flex-1 justify-start items-center flex-row w-full p-3">
    <h2 class="wb-text mr-2 w-52 truncate font-bold">{{ title }}</h2>
    <div class="w-full">
      <div class="h-4 bg-theme-background-opacity-1" :style="{ width: `${value}%` }" />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
    value: number
  }>()
</script>
