<template>
  <main
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    class="wb-screen w-full bg-theme-background-2 p-5"
  >
    <div class="mb-10 w-auto md:w-60">
      <Logo :width="40" :back="true" />
    </div>
    <p class="wb-text text-lg mt-10 mb-20">
      {{ t('questions.default.description') }}
    </p>
    <QuestionsBlock>
      <template #title>
        {{ t('questions.navigatorSupport.title') }}
      </template>
      <template #description>
        {{ t('questions.navigatorSupport.description') }}
      </template>
      <QuestionsNavigatorSupport />
    </QuestionsBlock>
    <QuestionsBlock>
      <template #title>
        {{ t('questions.generatorSupport.title') }}
      </template>
      <template #description>
        {{ t('questions.generatorSupport.description') }}
      </template>
      <QuestionsGeneratorSupport />
    </QuestionsBlock>
    <QuestionsBlock :hidden-toggle="true">
      <template #title>
        {{ t('questions.generatorRecommendations.title') }}
      </template>
      <template #description>
        {{ t('questions.generatorRecommendations.description') }}
      </template>
    </QuestionsBlock>
    <QuestionsBlock :hidden-toggle="true">
      <template #title>
        {{ t('questions.importProjects.title') }}
      </template>
      <template #description>
        {{ t('questions.importProjects.description') }}
      </template>
    </QuestionsBlock>
    <QuestionsBlock :hidden-toggle="true">
      <template #title>
        {{ t('questions.releasePlanning.title') }}
      </template>
      <template #description>
        {{ t('questions.releasePlanning.description') }}
      </template>
    </QuestionsBlock>
    <QuestionsBlock :hidden-toggle="true">
      <template #title>
        {{ t('questions.futureFeatures.title') }}
      </template>
      <template #description>
        {{ t('questions.futureFeatures.description') }}
        <a
          target="_blank"
          href="https://github.com/Novout/betterwrite"
          class="underline cursor-pointer"
          >{{ t('questions.futureFeatures.clickHere') }}</a
        >
      </template>
    </QuestionsBlock>
  </main>
</template>

<script setup lang="ts">
  import { tryOnMounted } from '@vueuse/core'
  import { usePlugin } from 'better-write-plugin-core'
  import { useI18n } from 'vue-i18n'

  const plugin = usePlugin()
  const { t } = useI18n()

  tryOnMounted(async () => {
    plugin.emit('plugin-theme-set')
  })
</script>
