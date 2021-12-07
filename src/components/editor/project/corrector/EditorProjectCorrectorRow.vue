<template>
  <div class="flex justify-between wb-text items-center w-72">
    <p class="text-lg font-poppins">{{ props.title }}</p>
    <p class="font-bold">{{ props.result }}</p>
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
      type: String || Number,
    },
  })
</script>
