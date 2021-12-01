<template>
  <div class="flex items-center w-auto">
    <HeroIcon
      v-if="update"
      v-tooltip.bottom-end="{
        content: t('desktop.update.tooltip'),
        shown,
        theme: 'better-write',
      }"
      class="text-theme-editor-electron-update-text hover:theme-editor-electron-update-text-hover active:theme-editor-electron-update-text-active no-drag cursor-pointer mt-0.5"
      @click.prevent.stop="onUpdate"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="26"
        height="26"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 26 26"
      >
        <path
          d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7l7-7z"
          fill="currentColor"
        ></path>
      </svg>
    </HeroIcon>
    <HeroIcon
      class="wb-icon no-drag cursor-pointer"
      @click.prevent.stop="onMaximize"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="22"
        height="22"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 48 48"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 6l10 9.9"></path>
          <path d="M6 41.9L16 32"></path>
          <path d="M42 41.9L32.1 32"></path>
          <path d="M41.9 6L32 15.9"></path>
          <path d="M33 6h9v9"></path>
          <path d="M42 33v9h-9"></path>
          <path d="M15 42H6v-9"></path>
          <path d="M6 15V6h9"></path>
        </g>
      </svg>
    </HeroIcon>
    <HeroIcon
      class="wb-icon no-drag cursor-pointer ml-1"
      @click.prevent.stop="onClose"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M4 20h14v2H4a2 2 0 0 1-2-2V6h2v14M20.22 2H7.78C6.8 2 6 2.8 6 3.78v12.44C6 17.2 6.8 18 7.78 18h12.44c.98 0 1.78-.8 1.78-1.78V3.78C22 2.8 21.2 2 20.22 2M19 13.6L17.6 15L14 11.4L10.4 15L9 13.6l3.6-3.6L9 6.4L10.4 5L14 8.6L17.6 5L19 6.4L15.4 10l3.6 3.6z"
          fill="currentColor"
        ></path>
      </svg>
    </HeroIcon>
  </div>
</template>

<script setup lang="ts">
  import { useEditor } from '@/use/editor'
  import isElectron from 'is-electron'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const editor = useEditor()
  const update = ref<boolean>(false)
  const shown = ref<boolean>(true)

  const { t } = useI18n()

  const onClose = () => {
    window.close()
  }

  const onMaximize = () => {
    editor.fullScreen()
  }

  const onUpdate = () => {
    window.ipcRenderer.send('update-application')
  }

  if (isElectron()) {
    // (if) for dev tests
    window.ipcRenderer.receive('update-downloaded', () => {
      update.value = true
      shown.value = true

      setTimeout(() => {
        shown.value = false
      }, 5000)
    })
  }
</script>
