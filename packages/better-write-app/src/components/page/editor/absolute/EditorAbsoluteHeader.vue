<template>
  <header class="flex items-center justify-between">
    <MHeading>{{ props.title }}</MHeading>
    <IconClose class="wb-icon h-8 w-8" @click.prevent.stop="emit('close')" />
  </header>
</template>

<script setup lang="ts">
  const emit = defineEmits(['close'])

  const props = defineProps({
    title: {
      required: true,
      type: String,
    },
  })
</script>
