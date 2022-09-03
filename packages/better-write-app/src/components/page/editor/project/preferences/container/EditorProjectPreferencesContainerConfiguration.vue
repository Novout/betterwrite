<template>
  <EditorProjectPreferencesContainerSlot>
    <div class="flex flex-col gap-2">
      <PreferencesContainerTitle> Idioma </PreferencesContainerTitle>
      <div>
        <div
          v-for="(language, index) in LanguagesRaw"
          :key="index"
          :class="[
            locale === localeToRaw(language)
              ? 'bg-theme-background-opacity-1'
              : '',
          ]"
          class="flex gap-2 items-center pl-2 cursor-pointer py-1 w-full"
          @click.prevent.stop="onClickLanguage(language)"
        >
          <IconFlagBrazil
            v-if="language === 'Português do Brasil'"
            class="w-7 h-7"
          />
          <IconFlagUnitedStates
            v-else-if="language === 'English'"
            class="w-7 h-7"
          />
          <p class="truncate">{{ language }}</p>
        </div>
      </div>
    </div>
    <PreferencesContainerTitle>
      {{ t('editor.aside.configuration.entity.title') }}
    </PreferencesContainerTitle>
    <div class="wb-configuration">
      <p class="text-sm">{{ t('editor.aside.configuration.bars') }}</p>
      <InputBoolean v-model="EDITOR.configuration.bars" :specific="true" />
    </div>
    <div class="wb-configuration">
      <p class="text-sm">{{ t('editor.aside.configuration.bottomBar') }}</p>
      <InputBoolean v-model="EDITOR.configuration.bottomBar" :specific="true" />
    </div>
    <div class="wb-configuration">
      <p class="text-sm">{{ t('editor.aside.configuration.transition') }}</p>
      <InputBoolean
        v-model="EDITOR.configuration.transition"
        :specific="true"
      />
    </div>
    <div class="wb-configuration">
      <p class="text-sm">{{ t('editor.aside.configuration.autosave') }}</p>
      <InputBoolean v-model="EDITOR.configuration.autosave" :specific="true" />
    </div>
    <div class="wb-configuration">
      <p class="text-sm">{{ t('editor.aside.configuration.blocked') }}</p>
      <InputBoolean v-model="EDITOR.configuration.blocked" :specific="true" />
    </div>
    <div class="wb-configuration">
      <p class="text-sm">
        {{
          t(
            'editor.aside.configuration.entity.insertEntityInParagraphBreakLine'
          )
        }}
      </p>
      <InputBoolean
        v-model="EDITOR.configuration.entity.insertEntityInParagraphBreakLine"
        :specific="true"
      />
    </div>
  </EditorProjectPreferencesContainerSlot>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import {
    LanguagesRaw,
    localeToRaw,
    onSwitchLanguage,
  } from 'better-write-languages'
  import { useEditorStore } from '@/store/editor'
  import { useBar } from '@/use/global/bar'
  import { LanguageRaw } from 'better-write-types'

  const EDITOR = useEditorStore()

  const { t, locale } = useI18n()
  const bar = useBar()

  const onClickLanguage = (lang: LanguageRaw) => {
    bar.load(() => {
      onSwitchLanguage(lang).then((set) => {
        locale.value = set
      })
    })
  }
</script>
