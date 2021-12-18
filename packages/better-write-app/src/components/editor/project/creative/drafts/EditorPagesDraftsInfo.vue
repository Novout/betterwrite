<template>
  <div
    class="flex flex-col items-center justify-center bg-theme-editor-creative-drafts-container-item-background hover:bg-theme-editor-creative-drafts-container-item-background-hover active:bg-theme-editor-creative-drafts-container-item-background-active shadow-lg p-3 w-32 md:w-52"
  >
    <h3 class="font-bold md:text-base text-sm">{{ props.title }}</h3>
    <p class="font-bold md:text-base text-sm">{{ props.result }}</p>
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
