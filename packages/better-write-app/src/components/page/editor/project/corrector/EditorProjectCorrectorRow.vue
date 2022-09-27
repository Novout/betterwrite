<template>
  <div
    class="flex justify-between wb-text items-center w-auto transition-all hover:bg-black-opacity mb-4 cursor-pointer"
    @click="emit('click')"
  >
    <p class="text-base pointer-events-none font-bold">{{ props.title }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['click'])

  const props = defineProps({
    title: {
      required: true,
      type: String,
    },
  })
</script>
