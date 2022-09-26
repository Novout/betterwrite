<template>
  <div class="flex items-center gap-2">
    <div
      v-if="EDITOR.styles.base.backgroundData"
      class="flex items-center justify-center bg-theme-background-2 rounded-lg w-10 h-10"
    >
      <img :src="EDITOR.styles.base.backgroundData" class="w-5 h-5" />
    </div>
    <div
      class="flex items-center justify-center bg-theme-background-2 rounded-lg w-10 h-10"
    >
      <div @click="open()">
        <IconUpload class="wb-icon w-5 h-5" />
      </div>
    </div>
    <div
      v-if="EDITOR.styles.base.backgroundData"
      class="flex items-center justify-center bg-theme-background-2 rounded-lg w-10 h-10"
    >
      <div @click="emit('exclude')">
        <IconDelete class="wb-icon w-5 h-5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useEditorStore } from '@/store/editor'
  import { useFileSystemAccess } from '@vueuse/core'
  import { watch } from 'vue'

  const EDITOR = useEditorStore()

  const { open, data } = useFileSystemAccess({
    dataType: 'Blob',
    types: [
      {
        description: '.png .jpeg .jpg .gif',
        accept: {
          'image/png': ['.png'],
          'image/jpeg': ['.jpeg', '.jpg'],
          'image/gif': ['.gif'],
        },
      },
    ],
    excludeAcceptAllOption: true,
  })

  const emit = defineEmits(['load', 'error', 'exclude'])

  watch(data, (d) => {
    const reader = new FileReader()

    if (!d) return

    reader.readAsDataURL(d)

    reader.onload = () => {
      emit('load', reader.result)
    }
    reader.onerror = function () {}
  })
</script>
