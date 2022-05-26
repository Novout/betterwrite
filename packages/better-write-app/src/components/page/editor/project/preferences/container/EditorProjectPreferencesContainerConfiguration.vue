<template>
  <EditorProjectPreferencesContainerSlot>
    <div class="flex flex-col gap-2">
      <PreferencesContainerTitle> Idioma </PreferencesContainerTitle>
      <div>
        <div
          v-for="(language, index) in Languages"
          :key="index"
          :class="[
            locale === localeToRaw(language)
              ? 'bg-theme-background-opacity-1'
              : '',
          ]"
          class="flex gap-2 items-center pl-2 cursor-pointer py-1 w-full"
          @click.prevent.stop="onSwitchLanguage(language)"
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
  import { Language, Languages } from 'better-write-localisation'
  import { useEditorStore } from '@/store/editor'
  import { useNProgress } from '@vueuse/integrations/useNProgress'

  const EDITOR = useEditorStore()

  const { t, locale } = useI18n()
  const { isLoading } = useNProgress()

  const localeToRaw = (lang: Language) => {
    return (
      {
        'Português do Brasil': 'br',
        English: 'en',
      }[lang] || 'en'
    )
  }

  const onSwitchLanguage = (lang: Language) => {
    isLoading.value = true

    const set =
      {
        'Português do Brasil': 'br',
        English: 'en',
      }[lang] || 'en'

    localStorage.setItem('lang', set)
    locale.value = set

    const iso =
      {
        en: 'en-US',
        br: 'pt-BR',
      }[set] || 'en-US'

    ;(document.querySelector('html') as HTMLElement).lang = iso

    isLoading.value = false
  }
</script>
