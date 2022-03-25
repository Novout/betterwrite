<template>
  <aside
    v-if="ABSOLUTE.aside && PROJECT.type !== 'blank'"
    id="editor-aside"
    ref="aside"
    v-motion="'aside'"
    class="fixed wb-edit md:relative overflow-y-auto w-full md:w-60 bg-theme-aside-background hover:bg-theme-aside-background-hover active:bg-theme-aside-background-active z-20 shadow-lg"
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
    <AsideGraph />
  </aside>
  <HeroIcon
    v-else
    class="absolute z-10 left-0 transform rotate-180 right-1 wb-icon w-9 h-9 bg-theme-aside-background hover:bg-theme-aside-background-hover active:bg-theme-aside-background-active rounded-br shadow-xl"
    @click.prevent.stop="ABSOLUTE.aside = true"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z"
      ></path>
      <path
        fill="currentColor"
        d="m11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"
      ></path>
    </svg>
  </HeroIcon>
</template>

<script lang="ts" setup>
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useSwipe, useWindowSize } from '@vueuse/core'
  import { ref } from 'vue'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

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
