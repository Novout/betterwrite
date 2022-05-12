<template>
  <Modal @close="onClose">
    <div
      ref="base"
      :style="style"
      class="fixed flex gap-2 flex-col w-3/4 md:w-1/2 bg-theme-background-1 wb-text rounded shadow-2xl p-5 overflow-y-auto wb-scroll"
    >
      <EditorAbsoluteHeader
        class="pl-5 mb-5"
        :title="t('editor.live.enter.title')"
        @close="onClose"
      />
      <p>{{ t('editor.live.enter.description') }}</p>
      <InputText
        v-model="input"
        class="w-full bg-theme-background-opacity-1 py-0.5 px-3"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { onClickOutside, useDraggable } from '@vueuse/core'
  import { usePlugin } from 'better-write-plugin-core'
  import { ID } from 'better-write-types'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()

  const { t } = useI18n()
  const plugin = usePlugin()

  const id = ref<ID<string> | null>(null)
  const base = ref<HTMLElement | null>(null)
  const input = ref<string>('')

  const { style } = useDraggable(base as any, {
    initialValue: { x: window.innerWidth / 4, y: window.innerHeight / 3 },
  })

  onClickOutside(base as any, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.live.enter = false
  }
</script>
