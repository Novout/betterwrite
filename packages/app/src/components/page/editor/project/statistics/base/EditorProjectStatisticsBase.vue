<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="50"
    class="flex flex-1 flex-col w-full md:w-96 p-3 shadow-lg"
  >
    <h2 class="font-bold font-poppins text-lg mb-5">
      {{ t('editor.addons.statistics.global') }}
    </h2>
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.characters')"
      :result="PROJECT.getAllCharacters"
    />
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.letters')"
      :result="PROJECT.getAllLetters"
    />
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.words')"
      :result="PROJECT.getAllWords"
    />
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.sentences')"
      :result="PROJECT.getAllSentences"
    />
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.paragraph')"
      :result="PROJECT.getAllParagraphs"
    />
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.heading')"
      :result="PROJECT.getAllHeadings"
    />
    <EditorProjectStatisticsBaseRow
      :title="t('editor.addons.statistics.fixed')"
      :result="PROJECT.getAllFixeds"
    />
  </div>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const { t } = useI18n()
</script>
