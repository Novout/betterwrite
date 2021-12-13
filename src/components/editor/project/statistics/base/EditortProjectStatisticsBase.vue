<template>
  <div class="flex flex-col w-full py-5">
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.characters')"
      :result="PROJECT.getAllCharacters()"
    />
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.letters')"
      :result="PROJECT.getAllLetters()"
    />
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.words')"
      :result="PROJECT.getAllWords()"
    />
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.paragraph')"
      :result="PROJECT.getAllParagraphs()"
    />
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.heading')"
      :result="PROJECT.getAllHeadings()"
    />
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.fixed')"
      :result="PROJECT.getAllFixeds()"
    />
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const { t } = useI18n()
</script>
