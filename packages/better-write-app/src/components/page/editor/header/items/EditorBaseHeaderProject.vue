<template>
  <!-- Project -->
  <EditorHeaderButton>
    <template #text>
      {{ t('editor.header.project') }}
    </template>
    <template #icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 9h6a1 1 0 0 0 1-1V2h10.002c.551 0 .998.455.998.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V9zm0-2l5-4.997V7H3z"
          fill="currentColor"
        ></path>
      </svg>
    </template>
    <template #bar>
      <EditorHeaderItem
        :text="t('editor.bar.project.new')"
        @action="project.external().new('creative')"
      />
      <EditorHeaderItem
        :text="t('editor.bar.project.blank')"
        @action="project.external().new('blank')"
      />
      <EditorHeaderItem
        :divider="true"
        :text="t('editor.bar.project.load')"
        @action="project.onLoadProject"
      />
      <EditorHeaderItem
        v-if="AUTH.account.user"
        :divider="true"
        :text="t('editor.bar.supabase.load')"
        @action="router.push('/dashboard')"
      />
      <EditorHeaderItemDiv v-if="PROJECT.name !== env.projectEmpty()" />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty()"
        :text="t('editor.bar.project.save')"
        @action="onSaveProject"
      />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty() && AUTH.account.user"
        :text="t('editor.bar.supabase.save')"
        @action="onSaveProjectSupabase"
      />
      <EditorHeaderItemDiv v-if="PROJECT.name !== env.projectEmpty()" />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty()"
        :text="t('editor.bar.assistants.actions')"
        @action="onLogger"
      />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty()"
        :text="t('editor.bar.project.statistics')"
        @action="ABSOLUTE.project.statistics = true"
      />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty()"
        :text="t('editor.bar.project.preferences')"
        @action="ABSOLUTE.project.preferences = true"
      />
      <EditorHeaderItemDiv />
      <EditorHeaderItemOpen :text="t('editor.bar.project.language')">
        <template #open>
          <div
            class="relative overflow-x-hidden bottom-16 flex flex-col h-40 w-40 wb-scroll overflow-y-auto bg-theme-editor-header-list-background rounded-tr rounded-br shadow"
          >
            <div
              v-for="(language, index) in Languages"
              :key="index"
              class="flex gap-2 items-center pl-2 hover:bg-theme-background-opacity-1 cursor-pointer py-1 w-full"
              @click.prevent.stop="onSwitchLanguage(language)"
            >
              <IconFlagBrazil
                v-if="language === 'Português do Brasil'"
                class="w-9 h-9"
              />
              <IconFlagUnitedStates
                v-else-if="language === 'English'"
                class="w-7 h-7"
              />
              <p class="truncate">{{ language }}</p>
            </div>
          </div>
        </template>
      </EditorHeaderItemOpen>
      <EditorHeaderItemOpen :text="t('editor.bar.project.theme')">
        <template #open>
          <div
            class="relative bottom-16 flex flex-col gap-1 h-40 w-40 overflow-y-auto wb-scroll bg-theme-editor-header-list-background rounded-tr rounded-br shadow"
          >
            <div
              v-for="([theme, logo], index) in Themes()"
              :key="index"
              class="flex items-center w-full gap-2 hover:bg-theme-background-opacity-1 cursor-pointer py-1"
              @click.prevent.stop="onSwitchTheme(theme)"
            >
              <img width="15" :src="logo" :alt="theme" />
              <p class="truncate">
                {{ theme.replaceAll('BetterWrite -', '') }}
              </p>
            </div>
          </div>
        </template>
      </EditorHeaderItemOpen>
      <EditorHeaderItemDiv />
      <EditorHeaderItem
        :text="t('editor.bar.project.import')"
        @action="project.onImportProject"
      />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty()"
        :text="t('editor.bar.project.export')"
        @action="project.onExportProject"
      />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty()"
        :text="t('editor.bar.project.exportAs')"
        @action="project.onExportProjectAs"
      />
    </template>
  </EditorHeaderButton>
</template>

<script setup lang="ts">
  import { useProject } from '@/use/project'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useI18n } from 'vue-i18n'
  import { useLocalStorage } from '@/use/storage/local'
  import { useSupabase } from '@/use/storage/supabase'
  import { useAuthStore } from '@/store/auth'
  import { useRouter } from 'vue-router'
  import { Language, Languages } from 'better-write-localisation'
  import { Themes } from 'better-write-plugin-theme'
  import { BetterWriteThemes } from 'better-write-types'
  import { useEditorStore } from '@/store/editor'
  import { nextTick } from 'vue'
  import { usePlugin } from 'better-write-plugin-core'
  import { useStorage } from '@/use/storage/storage'
  import { useNProgress } from '@vueuse/integrations/useNProgress'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const AUTH = useAuthStore()

  const supabase = useSupabase()
  const project = useProject()
  const env = useEnv()
  const local = useLocalStorage()
  const { t, locale } = useI18n()
  const { isLoading } = useNProgress()
  const plugin = usePlugin()
  const storage = useStorage()
  const router = useRouter()

  const onSaveProject = () => {
    if (!confirm(t('editor.window.saveLocal'))) return

    local.onSaveProject()
  }

  const onSaveProjectSupabase = () => {
    if (!confirm(t('editor.window.saveLocal'))) return

    supabase.saveProject()
  }

  const onSwitchLanguage = (lang: Language) => {
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
  }

  const onSwitchTheme = async (theme: BetterWriteThemes) => {
    EDITOR.configuration.theme = theme

    isLoading.value = true

    await nextTick

    await storage.normalize()

    plugin.emit('plugin-theme-set')

    isLoading.value = false
  }

  const onLogger = async () => {
    await storage.normalize()

    ABSOLUTE.logger = true
  }
</script>
