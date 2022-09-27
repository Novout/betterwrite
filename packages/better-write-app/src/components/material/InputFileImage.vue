<template>
  <div class="flex items-center gap-1">
    <div
      v-if="src"
      class="flex items-center justify-center bg-theme-background-2 rounded-lg w-10 h-10"
    >
      <img :src="src" class="w-5 h-5" />
    </div>
    <div
      class="flex items-center justify-center bg-theme-background-2 rounded-lg w-10 h-10"
    >
      <div @click="open({})">
        <IconUpload class="wb-icon w-5 h-5" />
      </div>
    </div>
    <div
      v-if="src"
      class="flex items-center justify-center bg-theme-background-2 rounded-lg w-10 h-10"
    >
      <div @click="emit('exclude')">
        <IconDelete class="wb-icon w-5 h-5" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useBase64, useFileSystemAccess } from '@vueuse/core'
  import { watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

  const { t } = useI18n()
  const toast = useToast()

  const props = defineProps<{
    src: string
    types: {
      description?: string | undefined
      accept: Record<string, string[]>
    }[]
  }>()

  const { open, data, fileSize } = useFileSystemAccess({
    dataType: 'Blob',
    types: props.types,
    excludeAcceptAllOption: true,
  })

  const emit = defineEmits(['load', 'error', 'exclude'])

  watch(data, (d) => {
    if (!d) return

    const { base64 } = useBase64(d)

    if (fileSize.value > 8000000) {
      toast.warning(t('toast.image.limitFileSize'))

      return
    }

    emit('load', base64)
  })
</script>
