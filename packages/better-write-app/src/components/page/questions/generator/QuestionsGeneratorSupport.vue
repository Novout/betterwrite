<template>
  <div class="flex flex-col items-end w-full mt-10">
    <div class="flex w-4/5 sm:w-9/12 md:w-10/12 bg-theme-background-3">
      <QuestionsGeneratorFile>
        <IconPDF class="w-9 h-9 md:(w-10 h-10)" />
        <p class="text-lg hidden md:inline">.PDF</p>
      </QuestionsGeneratorFile>
      <QuestionsGeneratorFile
        class="flex flex-1 items-center justify-center h-30"
      >
        <IconDOCX class="w-9 h-9 md:(w-10 h-10)" />
        <p class="text-lg hidden md:inline">.DOCX</p>
      </QuestionsGeneratorFile>
      <QuestionsGeneratorFile
        class="flex flex-1 items-center justify-center h-30"
      >
        <IconEPUB class="w-9 h-9 md:(w-10 h-10)" />
        <p class="text-lg hidden md:inline">.EPUB</p>
      </QuestionsGeneratorFile>
      <QuestionsGeneratorFile
        class="flex flex-1 items-center justify-center h-30"
      >
        <IconHTML class="w-9 h-9 md:(w-10 h-10)" />
        <p class="text-lg hidden md:inline">.HTML</p>
      </QuestionsGeneratorFile>
      <QuestionsGeneratorFile
        class="flex flex-1 items-center justify-center h-30"
      >
        <IconTXT class="w-9 h-9 md:(w-10 h-10)" />
        <p class="text-lg hidden md:inline">.TXT</p>
      </QuestionsGeneratorFile>
    </div>
    <div
      class="flex flex-col flex-1 w-full bg-theme-background-1 hover:bg-theme-background-opacity-1"
    >
      <div class="flex items-center">
        <p class="flex-1 text-base md:text-lg px-4">
          {{ t('questions.generatorSupport.items.paragraph') }}
        </p>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconLine class="w-9 h-9" />
        </QuestionsGeneratorFile>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 w-full bg-theme-background-1 hover:bg-theme-background-opacity-1"
    >
      <div class="flex items-center">
        <p class="flex-1 text-base md:text-lg px-4">
          {{ t('questions.generatorSupport.items.customParagraph') }}
        </p>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconLine class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 w-full bg-theme-background-1 hover:bg-theme-background-opacity-1"
    >
      <div class="flex items-center">
        <p class="flex-1 text-base md:text-lg px-4">
          {{ t('questions.generatorSupport.items.italicAndBold') }}
        </p>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 w-full bg-theme-background-1 hover:bg-theme-background-opacity-1"
    >
      <div class="flex items-center">
        <p class="flex-1 text-base md:text-lg px-4">
          {{ t('questions.generatorSupport.items.headings') }}
        </p>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconLine class="w-9 h-9" />
        </QuestionsGeneratorFile>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 w-full bg-theme-background-1 hover:bg-theme-background-opacity-1"
    >
      <div class="flex items-center">
        <p class="flex-1 text-base md:text-lg px-4">
          {{ t('questions.generatorSupport.items.breakLine') }}
        </p>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 w-full bg-theme-background-1 hover:bg-theme-background-opacity-1"
    >
      <div class="flex items-center">
        <p class="flex-1 text-base md:text-lg px-4">
          {{ t('questions.generatorSupport.items.breakPage') }}
        </p>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconLine class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 w-full bg-theme-background-1 hover:bg-theme-background-opacity-1"
    >
      <div class="flex items-center">
        <p class="flex-1 text-base md:text-lg px-4">
          {{ t('questions.generatorSupport.items.image') }}
        </p>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 w-full bg-theme-background-1 hover:bg-theme-background-opacity-1"
    >
      <div class="flex items-center">
        <p class="flex-1 text-base md:text-lg px-4">
          {{ t('questions.generatorSupport.items.list') }}
        </p>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 w-full bg-theme-background-1 hover:bg-theme-background-opacity-1"
    >
      <div class="flex items-center">
        <p class="flex-1 text-base md:text-lg px-4">
          {{ t('questions.generatorSupport.items.checkbox') }}
        </p>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconLine class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 w-full bg-theme-background-1 hover:bg-theme-background-opacity-1"
    >
      <div class="flex items-center">
        <p class="flex-1 text-base md:text-lg px-4">
          {{ t('questions.generatorSupport.items.summary') }}
        </p>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconLine class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 w-full bg-theme-background-1 hover:bg-theme-background-opacity-1"
    >
      <div class="flex items-center">
        <p class="flex-1 text-base md:text-lg px-4">
          {{ t('questions.generatorSupport.items.header') }}
        </p>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconLine class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconLine class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 w-full bg-theme-background-1 hover:bg-theme-background-opacity-1"
    >
      <div class="flex items-center">
        <p class="flex-1 text-base md:text-lg px-4">
          {{ t('questions.generatorSupport.items.footer') }}
        </p>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconYes class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconLine class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconLine class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
        <QuestionsGeneratorFile
          class="flex flex-1 items-center justify-center h-30"
        >
          <IconError class="w-9 h-9" />
        </QuestionsGeneratorFile>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
