<template>
  <main
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    class="min-h-screen overflow-y-auto w-full bg-theme-background-2 p-5"
  >
    <div class="mb-10 w-auto md:w-60">
      <Logo :width="40" :back="true" />
    </div>
    <p class="wb-text text-lg mt-10 mb-20">
      {{ t('questions.default.description') }}
    </p>
    <QuestionsBlock>
      <template #title>
        {{ t('questions.generatorSupport.title') }}
      </template>
      <template #description>
        {{ t('questions.generatorSupport.description') }}
      </template>
      <QuestionsGeneratorSupport />
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
