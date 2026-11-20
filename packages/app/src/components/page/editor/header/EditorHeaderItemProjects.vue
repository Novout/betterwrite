<template>
  <template v-if="projects.length">
    <EditorHeaderItemDiv />
    <p
      class="px-4 pt-1 pb-0.5 text-xs uppercase tracking-wide opacity-60 text-theme-editor-header-list-text"
    >
      {{ t('editor.bar.project.saved') }}
    </p>
    <div class="flex flex-col max-h-60 overflow-y-auto wb-scroll">
      <EditorHeaderItem
        v-for="item in projects"
        :key="item.id"
        :text="item.name"
        :title="item.name"
        @action="onOpen(item)"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="mr-2 w-4 h-4 flex-none"
            :class="
              item.id === PROJECT.localId
                ? 'text-theme-editor-header-list-text-active'
                : 'opacity-0'
            "
          >
            <path
              fill="currentColor"
              d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
            />
          </svg>
        </template>
        <template #shortcut>
          <div class="flex items-center gap-2 flex-none pl-3">
            <span class="text-xs opacity-60 whitespace-nowrap">
              {{ date(item.updatedAt) }}
            </span>
            <button
              class="opacity-50 hover:opacity-100 transition-opacity"
              :title="t('editor.bar.project.deleteSaved')"
              @click.prevent.stop="onDelete(item)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
                />
              </svg>
            </button>
          </div>
        </template>
      </EditorHeaderItem>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useProjectStore } from '@/store/project'
  import {
    useLocalStorage,
    localProjectsVersion,
    StoredProjectMeta,
  } from '@/use/storage/local'
  import { useProject } from '@/use/project'
  import { useEnv } from '@/use/env'

  const PROJECT = useProjectStore()

  const local = useLocalStorage()
  const project = useProject()
  const env = useEnv()
  const { t, locale } = useI18n()

  const projects = ref<StoredProjectMeta[]>([])

  const refresh = async () => {
    projects.value = await local.listProjects()
  }

  // the bar is mounted every time the menu opens; a save/delete that finishes
  // while it is open (e.g. "Salvar" still normalizing) refreshes it too
  onMounted(refresh)
  watch(localProjectsVersion, refresh)

  const date = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(locale.value, {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(new Date(iso))
    } catch {
      return ''
    }
  }

  const onOpen = async (item: StoredProjectMeta) => {
    if (item.id === PROJECT.localId) return

    // keep the work of the currently open project before switching
    if (PROJECT.name !== env.projectEmpty()) await local.onSaveProject(false)

    const context = await local.getProjectById(item.id)

    if (!context) {
      await refresh()
      return
    }

    await project.onLoadProject(context, true, true)
  }

  const onDelete = async (item: StoredProjectMeta) => {
    if (!confirm(t('editor.window.deleteSavedProject', { name: item.name })))
      return

    await local.deleteProject(item.id)
  }
</script>
