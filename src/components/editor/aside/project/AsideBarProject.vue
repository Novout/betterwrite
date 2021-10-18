<template>
  <AsideBarItem :title="t('editor.aside.project.title')">
    <template #icon>
      <HeroIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"
          />
          <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
      </HeroIcon>
    </template>
    <AsideProjectNew />
    <AsideLine v-if="project.isCreativeProject()" />
    <AsidePageNew
      v-if="name !== env.projectEmpty() && project.isCreativeProject()"
    />
    <AsidePageDelete
      v-if="name !== env.projectEmpty() && project.isCreativeProject()"
    />
    <AsideLine v-if="name !== env.projectEmpty()" />
    <AsideLoadProject />
    <AsideSaveProject v-if="name !== env.projectEmpty()" />
    <AsideLine />
    <AsideDropboxConnect />
    <AsideDropboxLoad v-if="store.state.auth.dropbox.accessToken" />
    <AsideDropboxSave
      v-if="name !== env.projectEmpty() && store.state.auth.dropbox.accessToken"
    />
    <AsideLine v-if="name !== env.projectEmpty()" />
    <AsideConfigurationPDF v-if="name !== env.projectEmpty()" />
    <AsidePreviewPDF v-if="name !== env.projectEmpty()" />
    <AsideGeneratePDF v-if="name !== env.projectEmpty()" />
    <AsideLine v-if="name !== env.projectEmpty()" />
    <AsideAddonLogger v-if="name !== env.projectEmpty()" />
    <AsideAddonTextFinder v-if="name !== env.projectEmpty()" />
    <AsideAddonTextSwitcher v-if="name !== env.projectEmpty()" />
  </AsideBarItem>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'
  import { useEnv } from '@/use/env'
  import { computed } from 'vue'
  import { useProject } from '@/use/project'

  const store = useStore()
  const { t } = useI18n()
  const env = useEnv()
  const project = useProject()

  const name = computed(() => store.state.project.name)
</script>
