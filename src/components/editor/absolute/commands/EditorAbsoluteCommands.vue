<template>
  <div
    class="
      flex
      mt-2
      justify-between
      items-center
      w-full
      p-1
      border-2 border-black
      dark:border-gray-600
      text-black
      dark:text-gray-300
      rounded
    "
  >
    <slot name="exib" />
    <div class="flex flex-col items-start justify-start">
      <p>{{ props.title }}</p>
      <p class="text-xs">{{ props.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: String,
    description: String,
  })
</script>
