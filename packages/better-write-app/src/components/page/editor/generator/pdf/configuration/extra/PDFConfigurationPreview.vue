<template>
  <div class="flex">
    <div class="flex w-full justify-center items-center flex-col">
      <div v-if="exists" class="flex items-center justify-between w-full">
        <p class="font-poppins wb-text font-bold text-lg">
          {{ t('editor.pdf.externals.preview.title') }}
        </p>
        <IconReload class="wb-icon w-7 h-7" @click="onReverse" />
      </div>
      <div id="pdf-preview-div" ref="preview"></div>
    </div>
    <div
      v-if="!exists"
      class="flex flex-col items-center justify-center w-full"
    >
      <Spinner v-if="inPreview" :width="100" :height="100" />
      <div class="flex items-center gap-2">
        <p class="font-poppins wb-text font-bold text-lg">
          {{ t('editor.pdf.externals.preview.title') }}
        </p>
        <Button @click.prevent.stop="onPreview">
          {{ t('editor.pdf.externals.generate.button') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import useEmitter from '@/use/emitter'
  import { useI18n } from 'vue-i18n'
  import { usePlugin } from 'better-write-plugin-core'
  import { useProject } from '@/use/project'
  import { useToast } from 'vue-toastification'

  const preview = ref<HTMLElement | null>(null)
  const exists = ref<boolean>(false)
  const plugin = usePlugin()
  const emitter = useEmitter()
  const project = useProject()
  const toast = useToast()
  const { t } = useI18n()

  const chapters = ref(project.utils().getChaptersSelection())

  const inPreview = ref<boolean>(false)

  const onPreview = async () => {
    const filterChapters = chapters.value.find((chapter) => chapter.select)

    if (!filterChapters) {
      toast(t('toast.pdf.generate.empty'))
      return
    }

    inPreview.value = true

    setTimeout(() => {
      plugin.emit('plugin-pdf-preview', {
        chapters: chapters.value,
      })
    }, 100)
  }

  emitter.on('pdf-preview-exists', () => {
    exists.value = true
    inPreview.value = false
  })

  const onReverse = () => {
    exists.value = false
    inPreview.value = false

    while (preview.value?.firstChild) {
      preview.value?.removeChild(preview.value?.firstChild)
    }
  }
</script>
