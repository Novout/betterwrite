<template>
  <img v-if="props.icon?.startsWith('data:image/')" :src="props.icon" class="w-5 h-5" />
  <p v-else>{{ props.icon }}</p>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string
}>()
</script>