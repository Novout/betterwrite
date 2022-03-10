<template>
  <!-- Externals -->
  <EditorHeaderButton v-if="PROJECT.name !== env.projectEmpty()">
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="iconify iconify--mdi"
        width="30"
        height="30"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4l3 3l3-3h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-5.12 10.88L12 17l-1.88-4.12L6 11l4.12-1.88L12 5l1.88 4.12L18 11"
          fill="currentColor"
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
