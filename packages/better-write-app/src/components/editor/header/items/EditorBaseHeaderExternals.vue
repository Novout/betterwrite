<template>
  <!-- Externals -->
  <EditorHeaderButton v-if="PROJECT.name !== env.projectEmpty()">
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M507.73 109.1c-2.24-9.03-13.54-12.09-20.12-5.51l-74.36 74.36l-67.88-11.31l-11.31-67.88l74.36-74.36c6.62-6.62 3.43-17.9-5.66-20.16c-47.38-11.74-99.55.91-136.58 37.93c-39.64 39.64-50.55 97.1-34.05 147.2L18.74 402.76c-24.99 24.99-24.99 65.51 0 90.5c24.99 24.99 65.51 24.99 90.5 0l213.21-213.21c50.12 16.71 107.47 5.68 147.37-34.22c37.07-37.07 49.7-89.32 37.91-136.73zM64 472c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"
        ></path>
      </svg>
    </template>
    <template #bar>
      <EditorHeaderItem
        :text="t('editor.bar.assistants.actions')"
        @action="ABSOLUTE.logger = true"
      />
      <EditorHeaderItem
        :text="t('editor.bar.assistants.finder')"
        @action="ABSOLUTE.shortcuts.finder = true"
      />
      <EditorHeaderItem
        :text="t('editor.bar.assistants.swapper')"
        @action="ABSOLUTE.shortcuts.switcher = true"
      />
    </template>
  </EditorHeaderButton>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useI18n } from 'vue-i18n'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const env = useEnv()
  const { t } = useI18n()
</script>
