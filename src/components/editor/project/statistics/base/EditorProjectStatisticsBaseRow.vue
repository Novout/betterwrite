<template>
  <div class="flex justify-between items-center w-full p-1 text-lg">
    <h2>{{ props.title }}</h2>
    <p>{{ props.result }}</p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      required: true,
      type: String,
    },
    result: {
      required: true,
      type: Number,
    },
  })
</script>
