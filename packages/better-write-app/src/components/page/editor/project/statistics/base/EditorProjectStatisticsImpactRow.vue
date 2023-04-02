<template>
  <div class="flex flex-1 justify-start items-center flex-row w-full p-3">
    <h2 class="wb-text mr-2 w-52 truncate font-bold">{{ title }}</h2>
    <div class="w-full">
      <div
        v-motion
        :initial="{ width: `0%` }"
        :enter="{
          width: `${value}%`,
          transition: { delay: 100, duration: 1200 },
        }"
        class="h-4 bg-theme-background-opacity-1 filter invert"
        :style="{ width: `${value}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
    value: number
  }>()
</script>
