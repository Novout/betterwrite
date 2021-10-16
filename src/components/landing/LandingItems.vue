<template>
  <li
    class="
      flex
      items-start
      w-full
      justify-between
      text-gray-300
      bg-black-opacity
      p-3
      my-1
    "
  >
    <HeroIcon class="mr-2 cursor-default">
      <slot name="icon"></slot>
    </HeroIcon>
    <p class="text-base md:text-lg ml-2">{{ props.title }}</p>
  </li>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
  })
</script>
