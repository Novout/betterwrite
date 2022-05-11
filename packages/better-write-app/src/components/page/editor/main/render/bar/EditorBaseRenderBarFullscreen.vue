<template>
  <IconFullScreen
    class="w-4 h-4 wb-icon"
    @click="utils.context().fullscren()"
  />
</template>

<script setup lang="ts">
  import { useUtils } from '@/use/utils'

  const utils = useUtils()
</script>
