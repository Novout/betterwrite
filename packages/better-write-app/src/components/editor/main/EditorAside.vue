<template>
  <aside
    v-if="ABSOLUTE.aside"
    id="editor-aside"
    ref="aside"
    v-motion="'aside'"
    class="fixed md:relative h-screen max-h-screen overflow-y-auto w-full md:w-60 bg-theme-aside-background hover:bg-theme-aside-background-hover active:bg-theme-aside-background-active z-aside shadow-lg"
    :style="{ left, opacity }"
    :initial="{
      x: -240,
    }"
    :enter="{
      x: 0,
    }"
    :leave="{
      x: -240,
    }"
  >
    <AsideBarLogo />
    <AsideGraph />
  </aside>
</template>

<script lang="ts" setup>
  import { useAbsoluteStore } from '@/store/absolute'
  import { useSwipe, useWindowSize } from '@vueuse/core'
  import { ref } from 'vue'

  const ABSOLUTE = useAbsoluteStore()

  const aside = ref<HTMLElement | null>(null)
  const left = ref('0')
  const opacity = ref(1)

  const { width } = useWindowSize()
  const { lengthX } = useSwipe(aside as any, {
    passive: true,
    onSwipe() {
      if (width.value) {
        if (lengthX.value > 0) {
          const length = Math.abs(lengthX.value)
          left.value = `-${length}px`
          opacity.value = 1.1 - length / width.value
        } else {
          left.value = '0'
          opacity.value = 1
        }
      }
    },
    onSwipeEnd() {
      left.value = '0'
      opacity.value = 1

      if (
        lengthX.value > 0 &&
        width.value &&
        Math.abs(lengthX.value) / width.value >= 0.5
      ) {
        ABSOLUTE.aside = false
      } else {
        ABSOLUTE.aside = true
      }
    },
  })
</script>
