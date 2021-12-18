<template>
  <div class="flex flex-col w-full p-1 my-8 shadow-lg lg:w-1/2">
    <h3 class="text-2xl font-bold text-theme-text-2">
      {{ t('editor.aside.commands.title') }}
    </h3>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.prefix') }}</p>
      <InputText
        v-model="EDITOR.configuration.commands.prefix"
        class="wb-configuration-input-text"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[1].title') }}</p>
      <InputText
        v-model="EDITOR.configuration.commands.paragraph.prefix"
        class="wb-configuration-input-text"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[4].title') }}</p>
      <InputText
        v-model="EDITOR.configuration.commands.headingTwo.prefix"
        class="wb-configuration-input-text"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[5].title') }}</p>
      <InputText
        v-model="EDITOR.configuration.commands.headingThree.prefix"
        class="wb-configuration-input-text"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[6].title') }}</p>
      <InputText
        v-model="EDITOR.configuration.commands.pageBreak.prefix"
        class="wb-configuration-input-text"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[7].title') }}</p>
      <InputText
        v-model="EDITOR.configuration.commands.lineBreak.prefix"
        class="wb-configuration-input-text"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[8].title') }}</p>
      <InputText
        v-model="EDITOR.configuration.commands.image.prefix"
        class="wb-configuration-input-text"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[9].prefix') }}</p>
      <InputText
        v-model="EDITOR.configuration.commands.dialogue.prefix"
        class="wb-configuration-input-text"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[9].content') }}</p>
      <InputText
        v-model="EDITOR.configuration.commands.dialogue.value"
        class="wb-configuration-input-text"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useEditorStore } from '@/store/editor'
  import { useI18n } from 'vue-i18n'

  const EDITOR = useEditorStore()

  const { t } = useI18n()
</script>
