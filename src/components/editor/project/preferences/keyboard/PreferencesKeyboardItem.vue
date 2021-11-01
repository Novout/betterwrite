<template>
  <div class="flex flex-row justify-between items-center w-full my-2">
    <h3>{{ props.title }}</h3>
    <p class="px-2 py-1 rounded-full dark:bg-gray-800 bg-gray-200">
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
