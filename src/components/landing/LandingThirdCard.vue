<template>
  <div
    class="
      flex flex-col
      items-center
      justify-between
      h-52
      w-40
      p-8
      m-3
      bg-gray-800
      rounded-xl
    "
  >
    <slot></slot>
    <p class="text-gray-200 mt-3 text-xl font-bold">{{ props.title }}</p>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    title: {
      required: true,
      type: String,
    },
  })
</script>
