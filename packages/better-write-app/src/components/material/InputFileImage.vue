<template>
  <div class="flex items-center gap-2">
    <div
      v-if="src"
      class="flex items-center justify-center bg-theme-background-2 rounded-lg w-10 h-10"
    >
      <img :src="src" class="w-5 h-5" />
    </div>
    <div
      class="flex items-center justify-center bg-theme-background-2 rounded-lg w-10 h-10"
    >
      <div @click="onOpen">
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
  import { getImageFileRaw } from 'better-write-image-converter'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

  const { t } = useI18n()
  const toast = useToast()

  const props = defineProps<{
    src: string
    accept?: string
  }>()

  const emit = defineEmits(['load', 'error', 'exclude'])

  const onOpen = () => {
    getImageFileRaw({ accept: props.accept })
      .then(async ({ raw, fileSize }) => {
        if (fileSize > 8000000) {
          toast.warning(t('toast.image.limitFileSize'))

          return
        }

        emit('load', raw)
      })
      .catch(() => emit('error'))
  }
</script>
