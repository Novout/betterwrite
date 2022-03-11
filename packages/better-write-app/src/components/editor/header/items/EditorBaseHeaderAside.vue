<template>
  <!-- DROPBOX -->
  <EditorHeaderButton>
    <template #icon>
      <HeroIcon
        v-if="PROJECT.name !== env.projectEmpty() && PROJECT.type !== 'blank'"
        class="wb-header-button"
        :class="[ABSOLUTE.aside ? 'transform rotate-180' : '']"
        @click="ABSOLUTE.aside = !ABSOLUTE.aside"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </HeroIcon>
    </template>
  </EditorHeaderButton>
</template>

<script setup lang="ts">
  import { useProjectStore } from '@/store/project'
  import { useEnv } from '@/use/env'
  import { useAbsoluteStore } from '@/store/absolute'

  const PROJECT = useProjectStore()
  const ABSOLUTE = useAbsoluteStore()

  const env = useEnv()
</script>
