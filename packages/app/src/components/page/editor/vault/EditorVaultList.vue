<template>
  <section class="flex flex-col gap-3 w-60">
    <div v-for="(project, key) in projects" :key="key" class="flex-col w-full gap-2">
      <div class="flex gap-2 w-full">
        <p>${{ project.title }}</p>
        <p>${{ project.type }}</p>
      </div>
      <div class="flex justify-between w-full">
        <p>${{ project.level }}</p>
        <IconVaultOpen class="wb-icon">${{ t('editor.vault.load') }}</IconVaultOpen>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useBackend } from '@/use/backend';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const AUTH = useAuthStore()

const backend = useBackend()
const { t } = useI18n()

const projects = ref<any[]>([])
</script>