<template>
  <section
    :style="{ borderColor: color }"
    class="flex gap-2 p-4 flex-col w-full rounded-lg shadow-lg bg-theme-background-opacity-1 border"
  >
    <slot />
    <p class="text-sm text-justify">{{ description }}</p>
  </section>
</template>

<script setup lang="ts">
  defineProps<{
    description: string
    color: string
  }>()
</script>
