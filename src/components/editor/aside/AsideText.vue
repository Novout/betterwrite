<template>
  <div
    class="wb-aside-button cursor-pointer flex items-center"
    :class="[props.shortcuts ? 'justify-between' : 'justify-start']"
  >
    <p>{{ props.text }}</p>
    <p class="mr-2 text-2xs lg:text-2xs xl:text-xs">{{ props.shortcuts }}</p>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    shortcuts: {
      required: false,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
  })
</script>
