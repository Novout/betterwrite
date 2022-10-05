<template>
  <!-- Chapters -->
  <div
    v-if="project.isCreativeProject() && PROJECT.name !== env.projectEmpty()"
  ></div>
  <EditorHeaderButton
    v-if="project.isCreativeProject() && PROJECT.name !== env.projectEmpty()"
    type="help"
  >
    <template #text>
      {{ t('editor.header.help') }}
    </template>
    <template #icon>
      <IconHelp class="h-9 w-9 md:(w-7 h-7) mr-0 md:mr-1" />
    </template>
    <template #bar>
      <EditorHeaderItem
        :text="t('editor.bar.help.doubts')"
        @action="router.push('/questions')"
      />
      <EditorHeaderItem
        :text="t('editor.bar.help.terms')"
        @action="router.push('/terms-of-use')"
      />
      <EditorHeaderItem
        v-if="env.isDev()"
        :text="t('editor.bar.help.support')"
        @action="router.push('/support')"
      />
    </template>
  </EditorHeaderButton>
</template>

<script setup lang="ts">
  import { useProject } from '@/use/project'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const PROJECT = useProjectStore()

  const project = useProject()
  const env = useEnv()
  const { t } = useI18n()
  const router = useRouter()
</script>
