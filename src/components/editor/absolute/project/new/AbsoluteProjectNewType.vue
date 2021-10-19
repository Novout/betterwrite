<template>
  <div
    class="px-4 py-2 m-1 wb-text cursor-pointer rounded-full"
    :class="[
      props.title !== props.is
        ? 'bg-gray-200 dark:bg-gray-600'
        : 'bg-gray-400 dark:bg-gray-900 shadow-xl',
    ]"
  >
    {{ props.title }}
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      required: true,
      type: String,
    },
    is: {
      required: true,
      type: String,
    },
  })
</script>
