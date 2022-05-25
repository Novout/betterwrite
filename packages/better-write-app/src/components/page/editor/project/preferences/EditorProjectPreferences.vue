<template>
  <Modal @close="onClose">
    <div
      ref="main"
      :style="style"
      :class="[!mobile ? 'fixed' : '']"
      class="flex flex-col w-full md:w-1/2 h-full bg-theme-background-1 wb-text rounded shadow-2xl overflow-y-auto wb-scroll"
    >
      <EditorProjectPreferencesHeader />
      <div class="flex flex-1 w-full overflow-hidden">
        <EditorProjectPreferencesAside @section="(i) => (section = i)" />
        <EditorProjectPreferencesContainer :section="section" />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { onClickOutside, useDraggable } from '@vueuse/core'
  import { ref } from 'vue'
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

  const ABSOLUTE = useAbsoluteStore()

  const section = ref(0)

  const breakpoints = useBreakpoints(breakpointsTailwind)
  const mobile = breakpoints.isSmaller('md')

  const main = ref<HTMLElement | null>(null)

  const { style } = useDraggable(main as any, {
    initialValue: { x: window.innerWidth / 4, y: window.innerHeight / 6 },
  })

  onClickOutside(main as any, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.project.preferences = false
  }
</script>
