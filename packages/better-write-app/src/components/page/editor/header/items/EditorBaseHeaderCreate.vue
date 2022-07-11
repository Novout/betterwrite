<template>
  <!-- Create -->
  <EditorHeaderButton v-if="PROJECT.name !== env.projectEmpty()">
    <template #text>
      {{ t('editor.header.export') }}
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
          d="M14 2H4v20h16V8l-6-6zm-1 13v4h-2v-4H8l4.01-4L16 15h-3zm0-6V3.5L18.5 9H13z"
        ></path>
      </svg>
    </template>
    <template #bar>
      <EditorHeaderItem
        :text="t('editor.bar.pdf.configuration')"
        @action="ABSOLUTE.pdf.configuration = true"
      >
        <template #icon>
          <IconPDF class="w-6 h-6" />
        </template>
      </EditorHeaderItem>
      <EditorHeaderItem
        :text="t('editor.bar.pdf.generate')"
        @action="ABSOLUTE.pdf.generate = true"
      >
        <template #icon>
          <IconPDF class="w-6 h-6" />
        </template>
      </EditorHeaderItem>
      <EditorHeaderItemDiv />
      <EditorHeaderItem
        :text="t('editor.bar.docx.configuration')"
        @action="ABSOLUTE.docx.configuration = true"
      >
        <template #icon>
          <IconDOCX class="w-6 h-6" />
        </template>
      </EditorHeaderItem>
      <EditorHeaderItem
        :text="t('editor.bar.docx.generate')"
        @action="plugin.emit('plugin-docx-generate')"
      >
        <template #icon>
          <IconDOCX class="w-6 h-6" />
        </template>
      </EditorHeaderItem>
      <EditorHeaderItemDiv />
      <EditorHeaderItem
        :text="t('editor.bar.txt.generate')"
        @action="plugin.emit('plugin-txt-generate')"
      >
        <template #icon>
          <IconTXT class="w-6 h-6" />
        </template>
      </EditorHeaderItem>
      <EditorHeaderItemDiv />
      <EditorHeaderItem
        :text="t('editor.bar.generator.substitutions')"
        @action="ABSOLUTE.generator.substitutions = true"
      >
        <template #icon>
          <IconArrowTo class="w-6 h-6 transform -rotate-90" />
        </template>
      </EditorHeaderItem>
    </template>
  </EditorHeaderButton>
</template>

<script setup lang="ts">
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useI18n } from 'vue-i18n'
  import { usePlugin } from 'better-write-plugin-core'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const env = useEnv()
  const plugin = usePlugin()
  const { t } = useI18n()
</script>
