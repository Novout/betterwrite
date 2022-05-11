<template>
  <p
    :class="[item ? 'font-bold text-sm mt-1' : 'text-lg mt-3']"
    class="wb-text w-full"
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
  defineProps<{
    item?: boolean
  }>()
</script>
