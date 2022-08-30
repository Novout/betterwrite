<template>
  <div class="w-full wb-scroll overflow-auto">
    <div id="bw-wysiwyg" class="wb-edit" />
  </div>
</template>

<script setup lang="ts">
  import { usePlugin } from 'better-write-plugin-core'
  import { onBeforeUnmount } from 'vue'

  const plugin = usePlugin()

  onBeforeUnmount(async () => {
    await plugin.emit('plugin-annotations-reset')
  })
</script>
