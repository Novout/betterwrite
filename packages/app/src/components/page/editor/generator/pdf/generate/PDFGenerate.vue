<template>
  <Modal @close="onClose">
    <div
      ref="main"
      :style="style"
      :class="[!mobile ? 'fixed' : '']"
      class="flex w-full sm:w-auto sm:h-auto h-screen z-100 flex-col p-10 bg-rgba-blur bg-theme-background-1 wb-text overflow-x-auto rounded shadow-2xl wb-scroll"
    >
      <div class="flex justify-between w-full">
        <p class="text-2xl font-bold">PDF</p>
        <div @click="onClose">
          <IconClose class="wb-icon w-7 h-7" />
        </div>
      </div>
      <div id="pdf-preview-div" ref="preview"></div>
      <div
        v-if="!exists"
        class="flex font-raleway flex-col items-center justify-center min-h-80 w-full"
      >
        <Spinner v-if="inGenerate" :width="100" :height="100" />
        <div v-else class="flex h-80 overflow-y-auto wb-scroll flex-col py-5">
          <h2 class="text-base wb-text font-bold mb-2 font-poppins">
            {{ t('editor.pdf.gen.color') }}
          </h2>
          <InputSelect v-model="color" class="w-30" :arr="['RGB', 'CMYK']" />
          <h2 class="text-base wb-text font-bold mt-5 mb-2 font-poppins">
            {{ t('editor.pdf.gen.chapters') }}
          </h2>
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
        <Button v-if="!inGenerate" @click.prevent.stop="onGenerate">
          {{ t('editor.pdf.externals.generate.button') }}
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'
  import { usePlugin } from 'better-write-plugin-core'
  import type { ColorSchema } from 'better-write-types'
  import { useProject } from '@/use/project'
  import { useToast } from 'vue-toastification'
  import useEmitter from '@/use/emitter'
  import {
    breakpointsTailwind,
    useBreakpoints,
    useDraggable,
  } from '@vueuse/core'

  const ABSOLUTE = useAbsoluteStore()

  const preview = ref<HTMLElement | null>(null)
  const exists = ref<boolean>(false)
  const plugin = usePlugin()
  const project = useProject()
  const toast = useToast()
  const emitter = useEmitter()
  const { t } = useI18n()

  const breakpoints = useBreakpoints(breakpointsTailwind)
  const mobile = breakpoints.isSmaller('lg')

  const main = ref<HTMLElement | null>(null)
  const isHoveredHeader = ref(false)

  const { style } = useDraggable(main as any, {
    initialValue: { x: window.innerWidth / 2.5, y: window.innerHeight / 4 },
    onStart: () => {
      if (!isHoveredHeader.value) return false
    },
  })

  const chapters = ref(project.utils().getChaptersSelection())
  const color = ref<ColorSchema>('RGB')

  const inGenerate = ref<boolean>(false)

  const onClose = () => {
    ABSOLUTE.pdf.generate = false
  }

  const onGenerate = async () => {
    const filterChapters = chapters.value.find((chapter) => chapter.select)

    if (!filterChapters) {
      toast(t('toast.pdf.generate.empty'))
      return
    }

    inGenerate.value = true

    setTimeout(() => {
      plugin.emit('plugin-pdf-generate', {
        chapters: chapters.value,
        color: color.value,
      })
    }, 100)
  }

  emitter.on('pdf-preview-exists', () => {
    exists.value = false
    inGenerate.value = false
  })
</script>
