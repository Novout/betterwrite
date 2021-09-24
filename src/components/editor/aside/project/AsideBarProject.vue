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
    <AsidePageNew v-if="store.state.project.name !== useEnv().projectEmpty()" />
    <AsideLine v-if="store.state.project.name !== useEnv().projectEmpty()" />
    <AsideGeneratePDF
      v-if="store.state.project.name !== useEnv().projectEmpty()"
    />
  </AsideBarItem>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'
  import { useEnv } from '@/use/env'

  const store = useStore()
  const { t } = useI18n()
</script>
