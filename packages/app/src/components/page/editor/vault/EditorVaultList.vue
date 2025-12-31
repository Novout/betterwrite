<template>
  <section class="flex font-poppins flex-col gap-3 w-60 overflow-y-auto">
    <div v-for="(project, key) in projects" :key="key" class="flex-col p-2 text-white w-full transition-colors gap-5 hover:bg-theme-background-3">
      <div class="flex gap-5 w-full">
        <p class="truncate">{{ project.title }}</p>
        <p class="truncate">{{ project.size }}</p>
      </div>
      <div class="flex justify-between w-full">
        <p>Level {{ project.level }}</p>
        <IconVaultOpen class="wb-icon w-5 h-5">{{ t('editor.vault.load') }}</IconVaultOpen>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useBackend } from '@/use/backend';
import type { AuthItem } from 'better-write-types';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const AUTH = useAuthStore()

const backend = useBackend()
const { t } = useI18n()

// TODO: Backend here
const projects = ref<AuthItem[]>([{
  title: 'A Test',
  // Maybe background
  background: 'base64',
  size: '8.12KiB',
  level: 2
}, {
  title: 'A Test',
  // Maybe background
  background: 'base64',
  size: '8.12KiB',
  level: 2
}])
</script>