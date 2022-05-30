<template>
  <EditorProjectPreferencesContainerSlot>
    <div class="flex flex-col gap-2">
      <PreferencesContainerTitle> Tema </PreferencesContainerTitle>
      <div>
        <div
          v-for="([theme, logo], index) in Themes()"
          :key="index"
          class="flex items-center w-full gap-2 cursor-pointer py-1"
          :class="[
            EDITOR.configuration.theme === theme
              ? 'bg-theme-background-opacity-1'
              : '',
          ]"
          @click.prevent.stop="onSwitchTheme(theme)"
        >
          <img width="15" :src="logo" :alt="theme" />
          <p class="truncate">
            {{ theme.replaceAll('BetterWrite -', '') }}
          </p>
        </div>
      </div>
    </div>
    <div>
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
  </EditorProjectPreferencesContainerSlot>
</template>

<script setup lang="ts">
  import { Themes } from 'better-write-plugin-theme'
  import { useI18n } from 'vue-i18n'
  import { BetterWriteThemes } from 'better-write-types'
  import { useEditorStore } from '@/store/editor'
  import { nextTick } from 'vue'
  import { usePlugin } from 'better-write-plugin-core'
  import { useStorage } from '@/use/storage/storage'
  import { useNProgress } from '@vueuse/integrations/useNProgress'

  const EDITOR = useEditorStore()

  const { t } = useI18n()
  const { isLoading } = useNProgress()
  const plugin = usePlugin()
  const storage = useStorage()

  const onSwitchTheme = async (theme: BetterWriteThemes) => {
    EDITOR.configuration.theme = theme

    isLoading.value = true

    await nextTick

    await storage.normalize()

    plugin.emit('plugin-theme-set')

    isLoading.value = false
  }
</script>
