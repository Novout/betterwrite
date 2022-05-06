<template>
  <div class="flex items-center gap-1">
    <IconWIFI class="w-4 h-4 wb-icon" />
    <div
      :style="{
        backgroundColor: isOnline ? '#00EE00' : '#EE0000',
      }"
      class="w-1.5 h-1.5 rounded-full"
    />
  </div>
</template>

<script setup lang="ts">
  import { useNetwork } from '@vueuse/core'

  const { isOnline } = useNetwork()
</script>
