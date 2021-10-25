<template>
  <header class="flex justify-between items-center w-full bg-transparent drag">
    <div>
      <HeroIcon
        class="
          relative
          justify-center
          items-center
          z-aside-open
          wb-icon
          rounded-br
          no-drag
        "
        @click="ABSOLUTE.aside = !ABSOLUTE.aside"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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
      <HeroIcon
        v-if="PROJECT.name !== env.projectEmpty()"
        class="wb-icon inline-flex no-drag"
        @click.prevent.stop="onSwitcher"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm1 8a1 1 0 100 2h6a1 1 0 100-2H7z"
            clip-rule="evenodd"
          />
        </svg>
      </HeroIcon>
      <HeroIcon
        v-if="PROJECT.name !== env.projectEmpty()"
        class="wb-icon inline-flex no-drag"
        @click.prevent.stop="onFinder"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z"
          />
          <path
            fill-rule="evenodd"
            d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
            clip-rule="evenodd"
          />
        </svg>
      </HeroIcon>
      <div
        v-if="PROJECT.name !== env.projectEmpty()"
        class="
          w-1
          h-4
          mx-3
          border-r-2 border-gray-500
          dark:border-gray-500
          no-drag
        "
      ></div>
      <HeroIcon
        v-if="
          project.isCreativeProject() && PROJECT.name !== env.projectEmpty()
        "
        class="wb-icon no-drag"
        @click.prevent.stop="page.onUpPage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </HeroIcon>
      <HeroIcon
        v-if="
          project.isCreativeProject() && PROJECT.name !== env.projectEmpty()
        "
        class="wb-icon no-drag"
        @click.prevent.stop="page.onDownPage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </HeroIcon>
      <HeroIcon
        v-if="
          project.isCreativeProject() && PROJECT.name !== env.projectEmpty()
        "
        class="wb-icon inline-flex no-drag"
        @click.prevent.stop="page.onCreatePage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
            clip-rule="evenodd"
          />
        </svg>
      </HeroIcon>
      <HeroIcon
        v-if="
          project.isCreativeProject() && PROJECT.name !== env.projectEmpty()
        "
        class="wb-icon inline-flex no-drag"
        @click.prevent.stop="page.onDeletePage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
          <path
            fill-rule="evenodd"
            d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </HeroIcon>
      <div
        v-if="
          project.isCreativeProject() && PROJECT.name !== env.projectEmpty()
        "
        class="
          w-1
          h-4
          mx-3
          border-r-2 border-gray-500
          dark:border-gray-500
          no-drag
        "
      ></div>
      <HeroIcon
        v-if="PROJECT.name !== env.projectEmpty()"
        class="wb-icon inline-flex no-drag"
        @click.prevent.stop="editor.fullScreen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
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
      </HeroIcon>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { usePage } from '@/use/page'
  import { useEditor } from '@/use/editor'
  import { useProject } from '@/use/project'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useContextStore } from '@/store/context'
  import { useEnv } from '@/use/env'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const page = usePage()
  const project = useProject()
  const editor = useEditor()
  const env = useEnv()

  const onFinder = (e: MouseEvent) => {
    ABSOLUTE.shortcuts.finder = !ABSOLUTE.shortcuts.finder
  }

  const onSwitcher = (e: MouseEvent) => {
    ABSOLUTE.shortcuts.switcher = !ABSOLUTE.shortcuts.switcher
  }
</script>
