<template>
  <div
    :class="[disabled ? 'wb-disabled' : '']"
    class="flex items-center justify-around flex-1 gap-2 bg-theme-background-3 p-5 rounded-lg shadow-lg"
  >
    <p v-if="title">{{ title }}</p>
    <TooltipIcon v-if="tooltip" :tooltip="tooltip" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title?: string
    disabled?: boolean
    tooltip?: string
  }>()
</script>
