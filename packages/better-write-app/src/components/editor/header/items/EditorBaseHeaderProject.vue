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

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const AUTH = useAuthStore()

  const supabase = useSupabase()
  const project = useProject()
  const env = useEnv()
  const local = useLocalStorage()
  const { t } = useI18n()
  const router = useRouter()
  const dropbox = useDropbox()

  const onSaveProject = () => {
    if (!confirm(t('editor.window.saveLocal'))) return

    local.onSaveProject()
  }

  const onSaveProjectSupabase = () => {
    if (!confirm(t('editor.window.saveLocal'))) return

    supabase.saveProject()
  }
</script>
