<template>
  <header
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="100"
    class="flex justify-center items-center w-full bg-theme-editor-header-background hover:bg-theme-editor-header-background-hover active:bg-theme-editor-header-background-active z-50 pt-0.5"
  >
    <div class="w-12">
      <HeroIcon
        v-if="PROJECT.name !== env.projectEmpty() && PROJECT.type !== 'blank'"
        class="relative justify-center items-center z-aside-open wb-icon rounded-br no-drag mr-7"
        @click="ABSOLUTE.aside = !ABSOLUTE.aside"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </HeroIcon>
    </div>

    <div class="flex flex-row items-center">
      <EditorBaseHeaderProject />
      <EditorBaseHeaderCreate />
      <EditorBaseHeaderAddons />
      <EditorBaseHeaderChapters />
      <EditorBaseHeaderExternals />
    </div>
    <div class="flex-1 w-full"></div>
    <div class="flex flex-row items-center">
      <EditorBaseHeaderLogin />
      <div
        v-if="PROJECT.name !== env.projectEmpty() && mobile"
        class="wb-icon no-drag cursor-pointer"
        @click.prevent.stop="editor.fullScreen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { useEditor } from '@/use/editor'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const editor = useEditor()
  const env = useEnv()

  const breakpoints = useBreakpoints(breakpointsTailwind)

  const mobile = breakpoints.greater('md')
</script>
