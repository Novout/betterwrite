<template>
  <div class="flex flex-col w-full p-1 my-8 shadow-lg lg:w-1/2">
    <h3 class="text-2xl font-bold text-theme-text-2">
      {{ t('editor.aside.graph.title') }}
    </h3>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[0].title') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.commands.paragraph.active"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[1].title') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.commands.headingTwo.active"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[2].title') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.commands.headingThree.active"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[3].title') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.commands.pageBreak.active"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[4].title') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.commands.lineBreak.active"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[5].title') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.commands.image.active"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[6].title') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.commands.dialogue.active"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[7].title') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.commands.checkbox.active"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[8].title') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.commands.list.active"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p>{{ t('editor.aside.commands.contents[9].title') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.commands.drau.active"
        :specific="true"
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
