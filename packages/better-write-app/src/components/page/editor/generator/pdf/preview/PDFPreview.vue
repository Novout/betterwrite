<template>
  <EditorGenerateContainer
    :title="t('editor.pdf.externals.preview.title')"
    :close="onClose"
    :reverse="onReverse"
  >
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
        class="wb-text w-9 h-9"
      >
        <path
          d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023c.479 0 .774-.242.774-.651c0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018c.817.006 1.349-.444 1.349-1.396c.006-.83-.479-1.268-1.255-1.268z"
          fill="currentColor"
        ></path>
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 0 1-.308-.018v1.426H7v-3.936A7.558 7.558 0 0 1 8.219 14c.557 0 .953.106 1.22.319c.254.202.426.533.426.923c-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515c-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0 1 11.66 14c.757 0 1.249.136 1.633.426c.415.308.675.799.675 1.504c0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z"
          fill="currentColor"
        ></path>
      </svg>
    </template>
    <p class="wb-text break-words pointer-events-none w-auto sm:w-80 my-2">
      {{ t('editor.pdf.externals.preview.warning') }}
    </p>
    <div id="pdf-preview-div" ref="preview"></div>
    <div
      v-if="!exists"
      class="flex flex-col items-center justify-center min-h-80 w-full"
    >
      <Spinner v-if="inPreview" :width="100" :height="100" />
      <div v-else class="flex h-80 overflow-y-auto flex-col py-5">
        <h2 class="text-base wb-text font-bold mb-2 font-poppins">Capítulos</h2>
        <div
          v-for="(chapter, index) in chapters"
          :key="index"
          class="flex items-center justify-start gap-2 wb-text mb-3"
        >
          <InputBoolean v-model="chapter.select" />
          <p class="flex-1 w-72 text-base md:text-lg truncate">
            {{ chapter.page.entities[0].raw }}
          </p>
        </div>
      </div>
      <Button v-if="!inPreview" @click.prevent.stop="onPreview">
        {{ t('editor.pdf.externals.generate.button') }}
      </Button>
    </div>
  </EditorGenerateContainer>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import useEmitter from '@/use/emitter'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'
  import { usePlugin } from 'better-write-plugin-core'
  import { useProject } from '@/use/project'
  import { useToast } from 'vue-toastification'

  const ABSOLUTE = useAbsoluteStore()

  const preview = ref<HTMLElement | null>(null)
  const exists = ref<boolean>(false)
  const plugin = usePlugin()
  const emitter = useEmitter()
  const project = useProject()
  const toast = useToast()
  const { t } = useI18n()

  const chapters = ref(project.utils().getChaptersSelection())

  const inPreview = ref<boolean>(false)

  const onClose = () => {
    ABSOLUTE.pdf.preview = false
  }

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
