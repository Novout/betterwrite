<template>
  <div
    class="flex flex-row font-bold justify-between text-theme-text-2 items-center w-full my-2"
  >
    <h3>{{ props.title }}</h3>
    <p class="px-2 py-1 rounded-full text-theme-text-2 shadow-lg w-24">
      {{ props.shortcut }}
    </p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      required: true,
      type: String,
    },
    shortcut: {
      required: true,
      type: String,
    },
  })
</script>
