<template>
  <div
    class="
      flex
      mt-1
      justify-between
      items-center
      w-full
      p-1
      border border-theme-border-commands-1
      text-theme-text-commands-1
      rounded
    "
  >
    <slot name="exib" />
    <div class="flex flex-col items-end justify-end">
      <p>{{ props.title }}</p>
      <p class="text-2xs">{{ props.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: String,
    description: String,
  })
</script>
