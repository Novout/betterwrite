<template>
  <div
    class="px-4 transition-all py-2 m-1 wb-text cursor-pointer rounded-full"
    :class="[
      props.title !== props.is
        ? 'bg-theme-background-2'
        : 'bg-theme-background-3 shadow-xl',
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
