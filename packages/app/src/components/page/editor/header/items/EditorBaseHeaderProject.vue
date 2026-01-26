<template>
  <!-- Project -->
  <EditorHeaderButton type="project">
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
        @action="ABSOLUTE.project.new = true"
      />
      <EditorHeaderItemDiv v-if="PROJECT.name !== env.projectEmpty()" />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty()"
        :text="t('editor.bar.project.save')"
        @action="onSaveProject"
      />
      <EditorHeaderItem
        v-if="PROJECT.name !== env.projectEmpty() && AUTH.user"
        :text="t('editor.bar.project.save')"
        @action="onSaveProjectInCloud"
      />
      <EditorHeaderItemDiv v-if="PROJECT.name !== env.projectEmpty()" />
      <EditorHeaderItem
        v-if="
          PROJECT.name !== env.projectEmpty() &&
          PROJECT.type !== 'only-annotations'
        "
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
  import { useAuthStore } from '@/store/auth'
  import { useContextStore } from '@/store/context'
  import { useContent } from '@/use/content'
  import { useVaultStore } from '@/store/vault'
import { useToast } from 'vue-toastification'
import { nextTick } from 'vue'

  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const VAULT = useVaultStore()
  const AUTH = useAuthStore()

  const project = useProject()
  const env = useEnv()
  const local = useLocalStorage()
  const content = useContent()
  const toast = useToast()
  const { t } = useI18n()

  const onSaveProject = () => {
    if (!confirm(t('editor.window.saveLocal'))) return

    local.onSaveProject()
  }

   const onSaveProjectInCloud = () => {
    local.onSaveProject().then(async () => {
      await nextTick

      fetch(`${env.api()}/library/${AUTH.user.id}`, {
        body: new URLSearchParams({ title: CONTEXT.title, content: JSON.stringify(content.get()) })
      }).then((res) => res.json())
        .then(( { library }) => {
          VAULT.libraries.push(library)

          toast.success(t('backend.save.successSave'))
        }).catch(() => {
          toast.error(t('backend.save.successError'))
        })
    })
  }
</script>
