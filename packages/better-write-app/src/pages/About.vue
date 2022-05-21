<template>
  <div
    ref="main"
    class="flex items-center overflow-x-hidden flex-col h-screen wb-scroll bg-gradient-to-br from-gray-900 to-gray-800 w-full"
  >
    <AboutInfo />
    <AboutEntity />
    <AboutPortability />
    <AboutFinish />
  </div>
</template>

<script setup lang="ts">
  import { useEventListener } from '@vueuse/core'
  import { reactive, ref } from 'vue'

  const main = ref<HTMLDivElement | null>(null)
  const section = reactive({
    actually: 0,
  })

  useEventListener(main, 'wheel', (e: WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const direction = e.deltaY > 0 ? 'down' : 'up'

    onToSection(direction)
  })

  useEventListener('keydown', (e: KeyboardEvent) => {
    const isDownKey = e.key === 'ArrowDown'
    const isUpKey = e.key === 'ArrowUp'

    if (isDownKey || isUpKey) {
      e.preventDefault()
      e.stopPropagation()

      if (isDownKey) onToSection('down')
      if (isUpKey) onToSection('up')
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
