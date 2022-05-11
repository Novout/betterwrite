<template>
  <div class="flex justify-end w-full">
    <IconClose class="wb-icon p-1 h-10 w-10" @click.prevent.stop="onClose" />
  </div>
</template>
<script setup lang="ts">
  import { useLocalStorage } from '@/use/storage/local'

  const local = useLocalStorage()

  const onClose = () => {
    local.onSaveProject(false).finally(() => window.location.reload())
  }
</script>
