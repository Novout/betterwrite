<template>
  <div class="w-full wb-scroll wb-edit overflow-auto">
    <div id="bw-wysiwyg" />
  </div>
</template>

<script setup lang="ts">
  import { usePlugin } from 'better-write-plugin-core'
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import type {
  Editor,
} from '@milkdown/core'

  const plugin = usePlugin()
  const editor = ref<Editor | null>(null)

  onMounted(() => {
    plugin.on('plugin-annotations-get-instance', (_editor: Editor) => {
      editor.value = _editor
    })
  })

  onBeforeUnmount(async () => {
    editor.value = null
    await plugin.emit('plugin-annotations-reset')
  })
</script>
