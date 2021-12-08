<template>
  <div
    class="flex justify-between wb-text items-center w-auto transition-all hover:bg-black-opacity p-2 mb-2"
    @mouseenter="emit('hover')"
    @touchstart="emit('hover')"
  >
    <p class="text-base font-poppins pointer-events-none">{{ props.title }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['hover'])

  const props = defineProps({
    title: {
      required: true,
      type: String,
    },
  })
</script>
