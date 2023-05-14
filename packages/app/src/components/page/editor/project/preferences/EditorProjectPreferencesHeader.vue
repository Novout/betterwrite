<template>
  <div
    ref="header"
    class="flex items-center justify-between px-3 w-full shadow cursor-pointer"
  >
    <PreferencesContainerTitle>{{
      t('editor.preferences.header.title')
    }}</PreferencesContainerTitle>
    <IconClose class="wb-icon h-8 w-8" @click.prevent.stop="onClose" />
  </div>
</template>
<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useLocalStorage } from '@/use/storage/local'
  import { useStorage } from '@/use/storage/storage'
  import { useElementHover } from '@vueuse/core'
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()

  const local = useLocalStorage()
  const { t } = useI18n()
  const header = ref()
  const storage = useStorage()
  const isHovered = useElementHover(header)
  const emit = defineEmits(['hover'])

  watch(isHovered, (v) => {
    emit('hover', v)
  })

  const onClose = async () => {
    if (confirm(t('editor.preferences.header.close'))) {
      await storage.normalize()
      await local.onSaveProject(false)

      window.location.reload()

      return
    }

    ABSOLUTE.project.preferences = false
  }
</script>
