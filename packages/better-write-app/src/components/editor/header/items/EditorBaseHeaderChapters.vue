<template>
  <!-- Chapters -->
  <div
    v-if="project.isCreativeProject() && PROJECT.name !== env.projectEmpty()"
    class="px-4"
  ></div>
  <EditorHeaderButton
    v-if="project.isCreativeProject() && PROJECT.name !== env.projectEmpty()"
  >
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="iconify iconify--ic"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm.59 4.59l4.83 4.83c.37.37.58.88.58 1.41V21c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h6.17c.53 0 1.04.21 1.42.59zM15 12h4.5L14 6.5V11c0 .55.45 1 1 1z"
          fill="currentColor"
        ></path>
      </svg>
    </template>
    <template #bar>
      <EditorHeaderItem
        :text="t('editor.bar.chapter.drafts')"
        @action="ABSOLUTE.pages.drafts = true"
      />
      <EditorHeaderItemDiv />
      <EditorHeaderItem
        :text="t('editor.bar.chapter.new')"
        shortcut="CTRL + Q"
        @action="page.onCreatePage"
      />
      <EditorHeaderItem
        :text="t('editor.bar.chapter.delete')"
        shortcut="CTRL + Alt + D"
        @action="page.onDeletePage"
      />
      <EditorHeaderItem
        :text="t('editor.bar.chapter.up')"
        shortcut=""
        @action="page.onUpPage"
      />
      <EditorHeaderItem
        :text="t('editor.bar.chapter.down')"
        shortcut=""
        @action="page.onDownPage"
      />
    </template>
  </EditorHeaderButton>
</template>

<script setup lang="ts">
  import { usePage } from '@/use/page'
  import { useProject } from '@/use/project'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useI18n } from 'vue-i18n'
  import { useAbsoluteStore } from '@/store/absolute'

  const PROJECT = useProjectStore()
  const ABSOLUTE = useAbsoluteStore()

  const page = usePage()
  const project = useProject()
  const env = useEnv()
  const { t } = useI18n()
</script>
