<template>
  <Modal @close="onClose">
    <div
      ref="corrector"
      :style="style"
      class="fixed flex flex-col w-1/2 h-3/4 bg-gray-800 wb-text p-5 rounded shadow-2xl"
    >
      <EditorAbsoluteHeader :title="'Corretor'" @close="onClose" />
      Coming soon...
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { onClickOutside, MaybeElementRef, useDraggable } from '@vueuse/core'
  import { ref } from 'vue'

  const ABSOLUTE = useAbsoluteStore()

  const corrector = ref<HTMLElement | null>(null)

  const { style } = useDraggable(corrector as any, {
    initialValue: { x: window.innerWidth / 4, y: window.innerHeight / 6 },
  })

  onClickOutside(corrector as MaybeElementRef, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.project.corrector = false
  }
</script>
