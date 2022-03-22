<template>
  <PDFContainer
    :title="t('editor.pdf.externals.preview.title')"
    :close="onClose"
  >
    <div
      id="pdf-preview-div"
      ref="preview"
      :class="[exists ? 'h-3/4 p-5' : '']"
    ></div>
  </PDFContainer>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import useEmitter from '@/use/emitter'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useI18n } from 'vue-i18n'
  import { usePlugin } from 'better-write-plugin-core'

  const ABSOLUTE = useAbsoluteStore()

  const preview = ref<HTMLElement | null>(null)
  const exists = ref<boolean>(false)
  const plugin = usePlugin()
  const emitter = useEmitter()
  const { t } = useI18n()

  onMounted(() => {
    plugin.emit('plugin-pdf-preview')

    emitter.on('pdf-preview-exists', () => {
      exists.value = true
    })
  })

  const onClose = () => {
    ABSOLUTE.pdf.preview = false
  }
</script>
