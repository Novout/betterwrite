<template>
  <div
    ref="target"
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay: 0,
        duration: 150,
      },
    }"
    class="relative -left-30 md:-left-20 transform duration-700 w-44 md:w-60 h-60 overflow-y-auto bg-theme-background-1 rounded transition shadow-2xl"
    :class="[visible ? '' : 'top-60']"
  >
    <EditorAbsoluteCommands
      :tag="t('editor.aside.commands.contents[0].tag')"
      :content="t('editor.aside.commands.contents[0].content')"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            d="M13 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4h-2v6H9V4h4m0 6a2 2 0 0 0 2-2a2 2 0 0 0-2-2h-2v4h2z"
            fill="currentColor"
          ></path>
        </svg>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :tag="t('editor.aside.commands.contents[1].tag')"
      :content="t('editor.aside.commands.contents[1].content')"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              d="M10 4v7H4V4H2v16h2v-7h6v7h2V4h-2z"
              fill="currentColor"
            ></path>
            <path
              d="M22 11.75C22 9.679 20.21 8 18 8s-4 1.679-4 3.75h2.133l.007-.144C16.218 10.707 17.02 10 18 10c1.03 0 1.867.784 1.867 1.75c0 .439-.173.841-.459 1.148L14 18.444V20h8v-2h-4.497l3.516-3.79l.158-.18A3.59 3.59 0 0 0 22 11.75z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :tag="t('editor.aside.commands.contents[2].tag')"
      :content="t('editor.aside.commands.contents[2].content')"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="26"
          height="26"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              d="M10 4v7H4V4H2v16h2v-7h6v7h2V4h-2z"
              fill="currentColor"
            ></path>
            <path
              d="M21.729 10l.002-2H14.5v2h4.378l-3.176 3.283l1.407 1.515c.256-.118.546-.186.854-.186c1.04 0 1.884.768 1.884 1.714c0 .947-.844 1.715-1.884 1.715c-.917 0-1.681-.597-1.849-1.386L14 17.029C14.36 18.722 15.998 20 17.963 20C20.193 20 22 18.355 22 16.326c0-1.691-1.256-3.117-2.968-3.543L21.73 10z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :tag="t('editor.aside.commands.contents[3].tag')"
      :content="t('editor.aside.commands.contents[3].content')"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="26"
          height="26"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              d="M2.5 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 2.5 12z"
              fill="currentColor"
            ></path>
            <path
              d="M6.5 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 6.5 12z"
              fill="currentColor"
            ></path>
            <path
              d="M10.5 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75z"
              fill="currentColor"
            ></path>
            <path
              d="M14.5 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75z"
              fill="currentColor"
            ></path>
            <path
              d="M18.5 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75z"
              fill="currentColor"
            ></path>
            <path
              d="M5 2a1 1 0 0 0-1 1v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a1 1 0 0 0-1-1H5z"
              fill="currentColor"
            ></path>
            <path
              d="M19 22a1 1 0 0 0 1-1v-4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4a1 1 0 0 0 1 1h14z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :tag="t('editor.aside.commands.contents[4].tag')"
      :content="t('editor.aside.commands.contents[4].content')"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="23"
          height="23"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
        >
          <g fill="currentColor">
            <path
              d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V9H2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3zM2 12h12v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2zM.5 10a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5z"
            ></path>
          </g>
        </svg>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :tag="t('editor.aside.commands.contents[5].tag')"
      :content="t('editor.aside.commands.contents[5].content')"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="26"
          height="26"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m0 18h12v-8l-4 4l-2-2l-6 6M8 9a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2z"
            fill="currentColor"
          ></path>
        </svg>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :tag="t('editor.aside.commands.contents[6].tag')"
      :content="t('editor.aside.commands.contents[6].content')"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="26"
          height="26"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 750 850"
        >
          <path
            d="M185 448h325v163q0 19-13 32t-34 14H185L69 750v-93H46q-19 0-32-14T0 611V309q0-19 14-33t32-13h139v185zM695 8q20 0 33 13t13 34v301q0 19-13 32t-33 14h-23v93l-116-93H232V55q0-20 13-34t33-13h417z"
            fill="currentColor"
          ></path>
        </svg>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :tag="t('editor.aside.commands.contents[7].tag')"
      :content="t('editor.aside.commands.contents[7].content')"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--ri"
          width="26"
          height="26"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7.003 13l7.07-7.071l-1.414-1.414l-5.656 5.657l-2.829-2.829l-1.414 1.414L11.003 16z"
          ></path>
        </svg>
      </template>
    </EditorAbsoluteCommands>
    <EditorAbsoluteCommands
      :tag="t('editor.aside.commands.contents[8].tag')"
      :content="t('editor.aside.commands.contents[8].content')"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--ic"
          width="26"
          height="26"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5s1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5S5.5 6.83 5.5 6S4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5s1.5-.68 1.5-1.5s-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
          ></path>
        </svg>
      </template>
    </EditorAbsoluteCommands>
  </div>
</template>

<script setup lang="ts">
  import { useIntersectionObserver } from '@vueuse/core'
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'

  const { t } = useI18n()

  const target = ref<any>(null)
  const visible = ref<boolean>(true)
  const block = ref<boolean>(false)

  useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (block.value) return

      visible.value = isIntersecting
      block.value = true
    },
    {
      threshold: 1,
    }
  )
</script>
