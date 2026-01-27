<template>
  <section class="flex font-poppins flex-col gap-3 w-60 wb-scroll max-h-80 overflow-y-auto">
    <div v-if="AUTH.user" v-for="(project, key) in VAULT.libraries" :key="key" class="flex-col p-2 text-white w-full transition-colors gap-5 hover:bg-theme-background-3">
      <div class="flex gap-5 w-full">
        <p class="truncate">{{ project.title }}</p>
      </div>
      <div class="flex justify-end mt-2 w-full">
        <div class="flex gap-3">
          <IconDelete @click="onDeleteProject(project.id)" class="wb-icon w-5 h-5"></IconDelete>
          <IconEnter @click="onLoadProject(project.id)" class="wb-icon w-5 h-5"></IconEnter>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useVaultStore } from '@/store/vault';
import { useEnv } from '@/use/env';
import { useProject } from '@/use/project';
import { ProjectObject } from 'better-write-types';
import { destr } from 'destr';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';

const AUTH = useAuthStore()
const VAULT = useVaultStore()

const project = useProject()
const toast = useToast()
const { t } = useI18n()
const env = useEnv()

onMounted(() => {
  if(VAULT.libraries.length === 0 && AUTH.user) {
    fetch(`${env.api()}/libraries/${AUTH.user.id}`, { method: 'GET' })
      .then(res => res.json())
      .then((libraries) => {
        VAULT.libraries = libraries || []

        if(VAULT.libraries.length > 0) toast.success(t('backend.vaultLoadSuccess'))
      })
      .catch(() => {
        toast.error(t('backend.vaultloadError'))
      })
  }
})

const onDeleteProject = (id:number) => {
  if(!confirm(t('backend.deleteProject'))) return

  fetch(`${env.api()}/library/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(({ library }) => {
        VAULT.libraries = VAULT.libraries.filter(({ id }) => id !== library.id)

        toast.success(t('backend.vault.deleteSuccess'))
      })
      .catch(() => {
        toast.error(t('backend.vault.deleteError'))
      })
}

const onLoadProject = (id:number) => {
  if(!confirm(t('backend.loadProject'))) return

  fetch(`${env.api()}/library/${id}`, { method: 'GET' })
    .then(res => res.json())
    .then(({ vault }) => {
      const content = destr<ProjectObject>(vault.content)

      project.onLoadProject(content, true).then(() => {})
    })
    .catch(() => {
      toast.error(t('backend.vault.loadVaultError'))
    })
}
</script>