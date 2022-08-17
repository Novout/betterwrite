<template>
  <div class="w-full wb-scroll overflow-auto">
    <div id="bw-wysiwyg" class="wb-edit" />
  </div>
</template>

<script setup lang="ts">
  import { usePlugin } from 'better-write-plugin-core'
  import { onMounted } from 'vue'

  const plugin = usePlugin()

  onMounted(() => {
    plugin.emit('plugin-annotations-start')
  })
</script>
