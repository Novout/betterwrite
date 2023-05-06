<template>
  <Modal @close="onClose">
    <div
      ref="main"
      :style="style"
      :class="[!mobile ? 'fixed' : '']"
      class="flex z-20 flex-col w-full bg-rgba-blur lg:w-1/2 h-full lg:h-3/4 bg-theme-background-1 wb-text overflow-x-auto overflow-y-hidden rounded shadow-2xl wb-scroll"
    >
      <EditorProjectPreferencesHeader @hover="(v) => (isHoveredHeader = v)" />
      <div
        class="flex font-raleway h-full lg:h-3/4 flex-col sm:flex-row flex-none sm:flex-1 w-full"
      >
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
  const mobile = breakpoints.isSmaller('lg')

  const main = ref<HTMLElement | null>(null)
  const isHoveredHeader = ref(false)

  const { style } = useDraggable(main as any, {
    initialValue: { x: window.innerWidth / 4, y: window.innerHeight / 6 },
    onStart: () => {
      if (!isHoveredHeader.value) return false
    },
  })

  onClickOutside(main as any, () => {
    onClose()
  })

  const onClose = () => {
    ABSOLUTE.project.preferences = false
  }
</script>
