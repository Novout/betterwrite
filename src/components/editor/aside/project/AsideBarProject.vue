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
    <AsideLine />
    <AsidePageNew v-if="name !== useEnv().projectEmpty()" />
    <AsidePageDelete v-if="name !== useEnv().projectEmpty()" />
    <AsideLine v-if="name !== useEnv().projectEmpty()" />
    <AsideLoadProject />
    <AsideSaveProject v-if="name !== useEnv().projectEmpty()" />
    <AsideLine />
    <AsideDropboxCorrect />
    <AsideDropboxLoad v-if="store.state.auth.dropbox.accessToken" />
    <AsideDropboxSave
      v-if="
        name !== useEnv().projectEmpty() && store.state.auth.dropbox.accessToken
      "
    />
    <AsideLine v-if="name !== useEnv().projectEmpty()" />
    <AsideConfigurationPDF v-if="name !== useEnv().projectEmpty()" />
    <AsidePreviewPDF v-if="name !== useEnv().projectEmpty()" />
    <AsideGeneratePDF v-if="name !== useEnv().projectEmpty()" />
    <AsideLine v-if="name !== useEnv().projectEmpty()" />
    <AsideAddonLogger v-if="name !== useEnv().projectEmpty()" />
    <AsideAddonTextFinder v-if="name !== useEnv().projectEmpty()" />
    <AsideAddonTextSwitcher v-if="name !== useEnv().projectEmpty()" />
  </AsideBarItem>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'
  import { useEnv } from '@/use/env'
  import { computed } from 'vue'

  const store = useStore()
  const { t } = useI18n()

  const name = computed(() => store.state.project.name)
</script>
