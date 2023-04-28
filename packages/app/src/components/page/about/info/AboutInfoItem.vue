<template>
  <div
    class="flex w-full gap-5 items-center justify-between text-white font-bold bg-black-opacity border border-black p-4 rounded shadow transition-all hover:shadow-xl"
  >
    <Icon class="wb-text">
      <slot />
    </Icon>
    <p>{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    content: string
  }>()
</script>
