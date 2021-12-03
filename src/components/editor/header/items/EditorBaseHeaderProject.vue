<template>
  <!-- Project -->
  <EditorHeaderButton>
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="iconify iconify--ri"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 9h6a1 1 0 0 0 1-1V2h10.002c.551 0 .998.455.998.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V9zm0-2l5-4.997V7H3z"
          fill="currentColor"
        ></path>
      </svg>
    </template>
    <template #bar>
      <EditorHeaderItem
        :text="t('editor.bar.project.new')"
        shortcut="CTRL + Shift + Q"
        @action="ABSOLUTE.project.new = true"
      />
      <EditorHeaderItem
        :divider="true"
        :text="t('editor.bar.project.load')"
        shortcut="CTRL + P"
        @action="project.onLoadProject"
      />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty()"
        :text="t('editor.bar.project.save')"
        shortcut="CTRL + S"
        @action="local.onSaveProject"
      />
      <EditorHeaderItemDiv />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty()"
        :text="t('editor.bar.project.preferences')"
        shortcut=""
        @action="ABSOLUTE.project.preferences = true"
      />
      <EditorHeaderItemDiv />
      <EditorHeaderItem
        :text="t('editor.bar.project.import')"
        @action="project.onImportProject"
      />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty()"
        :text="t('editor.bar.project.export')"
        @action="project.onExportProject"
      />
    </template>
  </EditorHeaderButton>
</template>

<script setup lang="ts">
  import { useProject } from '@/use/project'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useI18n } from 'vue-i18n'
  import { useLocalStorage } from '@/use/storage/local'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const project = useProject()
  const env = useEnv()
  const local = useLocalStorage()
  const { t } = useI18n()
</script>
