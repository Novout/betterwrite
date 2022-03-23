<template>
  <!-- Project -->
  <EditorHeaderButton>
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
      <EditorHeaderItemDiv />
      <EditorHeaderItem
        :text="t('editor.bar.dropbox.connect')"
        @action="dropbox.connect"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M7.06 1L0 5.61l4.882 3.908L12 5.123L7.06 1zM0 13.428l7.06 4.61L12 13.914L4.882 9.52L0 13.43zm12 .486l4.94 4.124l7.06-4.61l-4.882-3.91L12 13.914zM24 5.61L16.94 1L12 5.124l7.118 4.395L24 5.609zM12.014 14.8L7.06 18.913l-2.12-1.385v1.552l7.074 4.243l7.075-4.243v-1.552l-2.12 1.385l-4.955-4.112z"
            ></path>
          </svg>
        </template>
      </EditorHeaderItem>
      <EditorHeaderItem
        v-if="AUTH.dropbox.accessToken"
        :text="t('editor.bar.dropbox.load')"
        @action="dropbox.load"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M7.06 1L0 5.61l4.882 3.908L12 5.123L7.06 1zM0 13.428l7.06 4.61L12 13.914L4.882 9.52L0 13.43zm12 .486l4.94 4.124l7.06-4.61l-4.882-3.91L12 13.914zM24 5.61L16.94 1L12 5.124l7.118 4.395L24 5.609zM12.014 14.8L7.06 18.913l-2.12-1.385v1.552l7.074 4.243l7.075-4.243v-1.552l-2.12 1.385l-4.955-4.112z"
            ></path>
          </svg>
        </template>
      </EditorHeaderItem>
      <EditorHeaderItem
        v-if="AUTH.dropbox.accessToken"
        :text="t('editor.bar.dropbox.save')"
        @action="dropbox.save"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M7.06 1L0 5.61l4.882 3.908L12 5.123L7.06 1zM0 13.428l7.06 4.61L12 13.914L4.882 9.52L0 13.43zm12 .486l4.94 4.124l7.06-4.61l-4.882-3.91L12 13.914zM24 5.61L16.94 1L12 5.124l7.118 4.395L24 5.609zM12.014 14.8L7.06 18.913l-2.12-1.385v1.552l7.074 4.243l7.075-4.243v-1.552l-2.12 1.385l-4.955-4.112z"
            ></path>
          </svg>
        </template>
      </EditorHeaderItem>
      <EditorHeaderItemDiv v-if="PROJECT.name !== env.projectEmpty()" />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty()"
        :text="t('editor.bar.assistants.actions')"
        @action="ABSOLUTE.logger = true"
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
            class="relative overflow-x-hidden bottom-16 flex flex-col h-40 w-40 overflow-y-auto bg-theme-editor-header-list-background rounded-tr rounded-br shadow"
          >
            <p
              v-for="(language, index) in Languages"
              :key="index"
              class="pl-2 hover:bg-theme-background-opacity-1 cursor-pointer py-1 truncate w-40 text-xs"
              @click.prevent.stop="onSwitchLanguage(language)"
            >
              {{ language }}
            </p>
          </div>
        </template>
      </EditorHeaderItemOpen>
      <EditorHeaderItemOpen :text="t('editor.bar.project.theme')">
        <template #open>
          <div
            class="relative overflow-x-hidden bottom-16 flex flex-col h-40 w-40 overflow-y-auto bg-theme-editor-header-list-background rounded-tr rounded-br shadow"
          >
            <p
              v-for="(theme, index) in defines.themes()"
              :key="index"
              class="pl-2 w-40 hover:bg-theme-background-opacity-1 cursor-pointer py-1 truncate w-40 text-xs"
              @click.prevent.stop="onSwitchTheme(theme)"
            >
              {{ theme }}
            </p>
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
  import { useDropbox } from '@/use/storage/dropbox'
  import { Language, Languages } from 'better-write-localisation'
  import { useDefines } from '@/use/defines'
  import { BetterWriteThemes } from 'better-write-types'
  import { useEditorStore } from '@/store/editor'
  import { nextTick } from 'vue'
  import { usePlugin } from 'better-write-plugin-core'
  import { useStorage } from '@/use/storage/storage'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const AUTH = useAuthStore()

  const supabase = useSupabase()
  const project = useProject()
  const env = useEnv()
  const local = useLocalStorage()
  const { t, locale } = useI18n()
  const plugin = usePlugin()
  const storage = useStorage()
  const router = useRouter()
  const dropbox = useDropbox()
  const defines = useDefines()

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

    await nextTick

    plugin.emit('plugin-theme-set')

    storage.normalize()
  }
</script>
