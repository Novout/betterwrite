<template>
  <!-- Externals -->
  <EditorHeaderButton
    v-if="PROJECT.name !== env.projectEmpty()"
    type="externals"
  >
    <template #text>
      {{ t('editor.header.tools') }}
    </template>
    <template #icon>
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
          d="m13.78 15.3l6 6l2.11-2.16l-6-6l-2.11 2.16m3.72-5.2c-.39 0-.81-.05-1.14-.19L4.97 21.25l-2.11-2.11l7.41-7.4L8.5 9.96l-.72.7l-1.45-1.41v2.86l-.7.7l-3.52-3.56l.7-.7h2.81l-1.4-1.41l3.56-3.56a2.976 2.976 0 0 1 4.22 0L9.89 5.74l1.41 1.4l-.71.71l1.79 1.78l1.82-1.88c-.14-.33-.2-.75-.2-1.12a3.49 3.49 0 0 1 3.5-3.52c.59 0 1.11.14 1.58.42L16.41 6.2l1.5 1.5l2.67-2.67c.28.47.42.97.42 1.6c0 1.92-1.55 3.47-3.5 3.47Z"
        ></path>
      </svg>
    </template>
    <template #bar>
      <EditorHeaderItem
        :text="t('editor.bar.chapter.drafts')"
        @action="ABSOLUTE.pages.drafts = true"
      >
        <template #icon>
          <IconDrafts class="mr-2 w-5 h-5" />
        </template>
      </EditorHeaderItem>
      <EditorHeaderItem
        :text="t('editor.bar.project.corrector')"
        @action="ABSOLUTE.project.corrector = true"
      >
        <template #icon>
          <IconEraser class="mr-2 w-5 h-5" />
        </template>
      </EditorHeaderItem>
      <EditorHeaderItem
        :text="t('editor.preferences.shortcuts.inserts.title')"
        @action="ABSOLUTE.project.insertions = true"
      >
        <template #icon>
          <IconInsertion class="mr-2 w-5 h-5" />
        </template>
      </EditorHeaderItem>
      <EditorHeaderItemDiv />
      <EditorHeaderItem
        :text="t('editor.bar.assistants.finder')"
        @action="ABSOLUTE.shortcuts.finder = true"
      />
      <EditorHeaderItem
        :text="t('editor.bar.assistants.swapper')"
        @action="ABSOLUTE.shortcuts.switcher = true"
      />
      <EditorHeaderItem
        :text="t('editor.bar.assistants.speechRecognition')"
        @action="
          ABSOLUTE.tools.speechRecognition = !ABSOLUTE.tools.speechRecognition
        "
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
