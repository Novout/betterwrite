<template>
  <div class="flex justify-between items-center w-full wb-text mr-5">
    <div class="flex items-center shadow-lg pl-2 pr-4 rounded-full">
      <slot name="icon" />
      <p class="ml-2 text-center font-bold min-w-17">{{ title }}</p>
    </div>
    <p><slot /></p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>
