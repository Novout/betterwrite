<template>
  <aside
    v-if="ABSOLUTE.aside && PROJECT.type !== 'blank'"
    id="editor-aside"
    ref="aside"
    v-motion="'aside'"
    :class="[
      !mobile ? 'bg-rgba-blur' : '',
      TUTORIAL.counter === 3 ? 'z-umax' : 'z-50',
    ]"
    class="fixed wb-edit md:relative overflow-y-auto wb-scroll w-full md:(w-60 min-w-60) lg:(w-72 min-w-72) xl:(w-82 min-w-82) shadow-lg bg-theme-aside-background hover:bg-theme-aside-background-hover active:bg-theme-aside-background-active"
    :style="{
      left,
      opacity,
      fontFamily: EDITOR.styles.graph.fontFamily,
      fontWeight: EDITOR.styles.graph.fontWeight,
      fontSize: `${EDITOR.styles.graph.fontSize}px`,
    }"
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
  <IconAsideGraph
    v-else-if="PROJECT.type !== 'blank'"
    :class="[TUTORIAL.counter === 3 ? 'z-umax' : 'z-50']"
    class="absolute left-0 transform top-22 md:top-12 wb-icon w-12 h-12 md:(w-9 h-9) bg-theme-aside-background hover:bg-theme-aside-background-hover active:bg-theme-aside-background-active rounded-br shadow-xl"
    @click.prevent.stop="ABSOLUTE.aside = true"
  />
</template>

<script lang="ts" setup>
  import { useAbsoluteStore } from '@/store/absolute'
  import { useEditorStore } from '@/store/editor'
  import { useProjectStore } from '@/store/project'
  import { useTutorialStore } from '@/store/tutorial'
  import {
    breakpointsTailwind,
    useBreakpoints,
    useSwipe,
    useWindowSize,
  } from '@vueuse/core'
  import { ref } from 'vue'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const TUTORIAL = useTutorialStore()

  const aside = ref<HTMLElement | null>(null)
  const left = ref('0')
  const opacity = ref(1)

  const breakpoints = useBreakpoints(breakpointsTailwind)
  const mobile = breakpoints.greater('md')

  const { width } = useWindowSize()
  const { lengthX } = useSwipe(aside, {
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
