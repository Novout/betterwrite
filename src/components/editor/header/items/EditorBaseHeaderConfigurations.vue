<template>
  <!-- Configurations -->
  <EditorHeaderButton v-if="PROJECT.name !== env.projectEmpty()">
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="iconify iconify--eos-icons"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M10.507 14.142a1.35 1.35 0 1 0 1.35 1.35a1.348 1.348 0 0 0-1.35-1.35z"
          fill="currentColor"
        ></path>
        <path
          d="M14 2.01H6a1.997 1.997 0 0 0-1.99 2l-.01 16a1.997 1.997 0 0 0 1.99 2H18a2.006 2.006 0 0 0 2-2v-12zm.863 14.958l-.9 1.557a.236.236 0 0 1-.279.099l-1.125-.45a3.328 3.328 0 0 1-.756.44l-.17 1.189a.231.231 0 0 1-.226.189h-1.8a.224.224 0 0 1-.225-.19l-.17-1.187a3.079 3.079 0 0 1-.766-.441l-1.116.45a.228.228 0 0 1-.279-.1l-.9-1.556a.234.234 0 0 1 .054-.288l.954-.747a3.618 3.618 0 0 1 0-.882l-.954-.747a.223.223 0 0 1-.054-.288l.9-1.557a.236.236 0 0 1 .28-.1l1.115.45a3.593 3.593 0 0 1 .765-.44l.171-1.188a.231.231 0 0 1 .225-.19h1.8a.215.215 0 0 1 .216.19l.171 1.188a3.078 3.078 0 0 1 .765.44l1.116-.45a.228.228 0 0 1 .28.1l.9 1.557a.234.234 0 0 1-.055.288l-.954.747a2.368 2.368 0 0 1 .036.44a3.495 3.495 0 0 1-.036.442l.963.747a.234.234 0 0 1 .054.288zM13 9.01v-5.5l5.5 5.5z"
          fill="currentColor"
        ></path>
      </svg>
    </template>
    <template #bar>
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty()"
        :text="t('editor.bar.project.preferences')"
        shortcut=""
        @action="ABSOLUTE.project.preferences = true"
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
