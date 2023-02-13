<template>
  <div
    ref="main"
    class="flex items-center overflow-x-hidden flex-col h-screen wb-scroll bg-gradient-to-br from-gray-900 to-gray-700 w-full"
  >
    <AboutInfo />
    <AboutEntity />
    <AboutPortability />
    <AboutFinish />
  </div>
</template>

<script setup lang="ts">
  import { useEventListener, useScroll } from '@vueuse/core'
  import { reactive, ref } from 'vue'

  const main = ref<HTMLDivElement | null>(null)
  const section = reactive({
    actually: 0,
  })
  const { isScrolling } = useScroll(main)

  useEventListener(main, 'wheel', (e: WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const direction = e.deltaY > 0 ? 'down' : 'up'

    if (!isScrolling.value) onToSection(direction)
  })

  useEventListener('keydown', (e: KeyboardEvent) => {
    const isDownKey = e.key === 'ArrowDown'
    const isUpKey = e.key === 'ArrowUp'

    if ((isDownKey || isUpKey) && !isScrolling.value) {
      e.preventDefault()
      e.stopPropagation()

      if (isDownKey && !isScrolling.value) onToSection('down')
      if (isUpKey && !isScrolling.value) onToSection('up')
    }
  })

  const onToSection = (direction: 'down' | 'up') => {
    if (direction === 'down') {
      if (section.actually >= 3) return

      section.actually++
    } else {
      if (section.actually <= 0) return

      section.actually--
    }

    window.document
      .querySelector(`#about-${section.actually}`)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      })
  }
</script>
