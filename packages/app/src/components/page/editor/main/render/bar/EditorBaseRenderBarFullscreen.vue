<template>
  <IconFullScreen
    class="w-6 h-6 md:(w-5 h-5) wb-icon"
    @click="utils.context().fullscreen()"
  />
</template>

<script setup lang="ts">
  import { useUtils } from '@/use/utils'

  const utils = useUtils()
</script>
