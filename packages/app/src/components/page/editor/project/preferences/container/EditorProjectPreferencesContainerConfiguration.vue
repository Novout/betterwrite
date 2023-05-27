<template>
  <EditorProjectPreferencesContainerSlot>
    <div class="flex flex-col gap-1">
      <PreferencesContainerTitle>{{
        t('editor.aside.configuration.language')
      }}</PreferencesContainerTitle>
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
    <div>
      <PreferencesContainerTitle>
        {{ t('editor.aside.configuration.entity.title') }}
      </PreferencesContainerTitle>
      <div class="wb-preferences">
        <p class="text-sm">{{ t('editor.aside.configuration.bars') }}</p>
        <InputBoolean v-model="EDITOR.configuration.bars" :specific="true" />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">{{ t('editor.aside.configuration.bottomBar') }}</p>
        <InputBoolean
          v-model="EDITOR.configuration.bottomBar"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">{{ t('editor.aside.configuration.topBar') }}</p>
        <InputBoolean
          v-model="EDITOR.configuration.topBar"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">{{ t('editor.aside.configuration.transition') }}</p>
        <InputBoolean
          v-model="EDITOR.configuration.transition"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">{{ t('editor.aside.configuration.autosave') }}</p>
        <InputBoolean
          v-model="EDITOR.configuration.autosave"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">
          {{ t('editor.aside.configuration.cloudAutosave') }}
        </p>
        <InputBoolean
          v-model="EDITOR.configuration.cloudAutosave"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
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
    </div>
    <div v-if="PROJECT.type === 'creative'">
      <PreferencesContainerTitle>
        {{ t('editor.aside.graph.title') }}
      </PreferencesContainerTitle>
      <div class="wb-preferences">
        <p class="text-sm">
          {{ t('editor.aside.commands.contents[0].title') }}
        </p>
        <InputBoolean
          v-model="EDITOR.configuration.commands.paragraph.active"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">
          {{ t('editor.aside.commands.contents[1].title') }}
        </p>
        <InputBoolean
          v-model="EDITOR.configuration.commands.headingTwo.active"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">
          {{ t('editor.aside.commands.contents[2].title') }}
        </p>
        <InputBoolean
          v-model="EDITOR.configuration.commands.headingThree.active"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">
          {{ t('editor.aside.commands.contents[3].title') }}
        </p>
        <InputBoolean
          v-model="EDITOR.configuration.commands.pageBreak.active"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">
          {{ t('editor.aside.commands.contents[4].title') }}
        </p>
        <InputBoolean
          v-model="EDITOR.configuration.commands.lineBreak.active"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">
          {{ t('editor.aside.commands.contents[5].title') }}
        </p>
        <InputBoolean
          v-model="EDITOR.configuration.commands.image.active"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">
          {{ t('editor.aside.commands.contents[6].title') }}
        </p>
        <InputBoolean
          v-model="EDITOR.configuration.commands.dialogue.active"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">
          {{ t('editor.aside.commands.contents[7].title') }}
        </p>
        <InputBoolean
          v-model="EDITOR.configuration.commands.checkbox.active"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">
          {{ t('editor.aside.commands.contents[8].title') }}
        </p>
        <InputBoolean
          v-model="EDITOR.configuration.commands.list.active"
          :specific="true"
        />
      </div>
      <div class="wb-preferences">
        <p class="text-sm">
          {{ t('editor.aside.commands.contents[9].title') }}
        </p>
        <InputBoolean
          v-model="EDITOR.configuration.commands.drau.active"
          :specific="true"
        />
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <PreferencesContainerTitle>
        {{ t('editor.aside.configuration.advanced') }}
      </PreferencesContainerTitle>
      <DescriptionContainer
        color="#AA0000"
        :description="
          t(
            'editor.preferences.configuration.editor.options.googleFonts.description'
          )
        "
      >
        <div class="wb-preferences">
          <p class="text-sm">
            {{
              t(
                'editor.preferences.configuration.editor.options.googleFonts.title'
              )
            }}
          </p>
          <InputBoolean v-model="EDITOR.styles.googleFontsInjection" />
        </div>
      </DescriptionContainer>
      <DescriptionContainer
        color="#AA0000"
        :description="
          t(
            'editor.preferences.configuration.editor.options.compressFiles.description'
          )
        "
      >
        <div class="wb-preferences">
          <p class="text-sm">
            {{
              t(
                'editor.preferences.configuration.editor.options.compressFiles.title'
              )
            }}
          </p>
          <div class="flex gap-2 items-center">
            <InputBoolean v-model="EDITOR.configuration.compressFiles.value" />
            <InputNumber
              v-model="EDITOR.configuration.compressFiles.quality"
              :min="0"
              :max="1"
              :step="0.1"
            />
          </div>
        </div>
      </DescriptionContainer>
      <DescriptionContainer
        color="#AA0000"
        :description="
          t(
            'editor.preferences.configuration.editor.options.trackEntities.description'
          )
        "
      >
        <div class="wb-preferences">
          <p class="text-sm">
            {{
              t(
                'editor.preferences.configuration.editor.options.trackEntities.title'
              )
            }}
          </p>
          <InputBoolean v-model="EDITOR.configuration.trackEntities" />
        </div>
      </DescriptionContainer>
      <DescriptionContainer
        color="#AA0000"
        :description="
          t(
            'editor.preferences.configuration.editor.options.purgeEntities.description'
          )
        "
      >
        <div class="wb-preferences">
          <p class="text-sm">
            {{
              t(
                'editor.preferences.configuration.editor.options.purgeEntities.title'
              )
            }}
          </p>
          <InputBoolean v-model="EDITOR.configuration.purgeEntities" />
        </div>
      </DescriptionContainer>
      <DescriptionContainer
        color="#AA0000"
        :description="
          t(
            'editor.preferences.configuration.clientStorage.description'
          )
        "
      >
        <div class="wb-preferences">
          <p class="text-sm">
            {{
              t(
                'editor.preferences.configuration.clientStorage.title'
              )
            }}
          </p>
          <InputSelect v-model="EDITOR.configuration.clientStorage.schema" :arr="['local-storage', 'indexeddb']"/>
        </div>
      </DescriptionContainer>
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
  import { useProjectStore } from '@/store/project'
  import { LanguageRaw } from 'better-write-types'

  const EDITOR = useEditorStore()
  const PROJECT = useProjectStore()

  const { t, locale } = useI18n()

  const onClickLanguage = (lang: LanguageRaw) => {
    onSwitchLanguage(lang).then((set) => {
      locale.value = set
    })
  }
</script>
