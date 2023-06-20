<template>
  <EditorHeaderButton v-if="PROJECT.name !== env.projectEmpty()" type="help">
    <template #text>
      {{ t('editor.header.help') }}
    </template>
    <template #icon>
      <IconHelp class="h-9 w-9 lg:(w-7 h-7) mr-0 md:mr-1" />
    </template>
    <template #bar>
      <EditorHeaderItem
        :text="t('editor.bar.help.doubts')"
        @action="router.push('/questions')"
      />
      <EditorHeaderItem
        :text="t('editor.bar.help.support')"
        @action="onClickToIssues"
      />
    </template>
  </EditorHeaderButton>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const PROJECT = useProjectStore()

  const env = useEnv()
  const { t } = useI18n()
  const router = useRouter()

  const onClickToIssues = () => {
    window.open('https://github.com/Novout/betterwrite/issues/new', '_blank', 'noopener,noreferrer')
  }
</script>
