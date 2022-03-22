<template>
  <PDFContainer
    :title="t('editor.pdf.externals.generate.title')"
    :close="onClose"
  >
    <div
      v-motion
      :initial="{ opacity: 0, x: 20 }"
      :enter="{ opacity: 1, x: 0 }"
      :delay="250"
      class="flex flex-col w-full p-5"
    >
      <h2 class="text-base wb-text font-bold mb-2 font-poppins">Capítulos</h2>
      <div
        v-for="(chapter, index) in chapters"
        :key="index"
        class="flex items-center justify-start gap-2 wb-text mb-3"
      >
        <InputBoolean v-model="chapter.select" />
        <p class="flex-1 text-base md:text-lg truncate">
          {{ chapter.page.entities[0].raw }}
        </p>
      </div>
    </div>
    <Button
      v-motion
      :initial="{ opacity: 0, x: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="350"
      :on-click="onGenerate"
      >{{ t('editor.pdf.externals.generate.button') }}</Button
    >
  </PDFContainer>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProject } from '@/use/project'
  import { usePlugin } from 'better-write-plugin-core'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

  const ABSOLUTE = useAbsoluteStore()

  const project = useProject()
  const plugin = usePlugin()
  const toast = useToast()
  const { t } = useI18n()

  const chapters = ref(project.utils().getChaptersSelection())

  const onClose = () => {
    ABSOLUTE.pdf.generate = false
  }

  const onGenerate = () => {
    const exists = chapters.value.find((chapter) => chapter.select)

    if (!exists) {
      toast(t('toast.pdf.generate.empty'))
      return
    }

    plugin.emit('plugin-pdf-generate', {
      final: true,
      chapters: chapters.value,
    })
  }
</script>
