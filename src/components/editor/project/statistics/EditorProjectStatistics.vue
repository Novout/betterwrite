<template>
  <FullModal :title="t('editor.bar.project.statistics')" @close="onClose">
    <div class="flex justify-start flex-col md:flex-row flex-wrap gap-5">
      <EditortProjectStatisticsBase />
      <EditortProjectStatisticsWord />
    </div>
  </FullModal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useContextStore } from '@/store/context'
  import { useProjectStore } from '@/store/project'
  import { useStorage } from '@/use/storage/storage'
  import { onClickOutside, MaybeElementRef } from '@vueuse/core'
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()
  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()

  const storage = useStorage()

  const { t } = useI18n()

  onMounted(() => {
    storage.normalize().then(() => {
      PROJECT.updateContext(CONTEXT.$state)
    })
  })

  const statistics = ref<HTMLElement | null>(null)

  onClickOutside(statistics as MaybeElementRef, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.project.statistics = false
  }
</script>
