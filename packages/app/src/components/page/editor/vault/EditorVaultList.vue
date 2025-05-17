<template>
  <div
    class="flex flex-col justify-start items-stretch gap-2 bg-black-opacity p-5 max-h-100 wb-scroll overflow-y-auto"
  >
    <EditorVaultDropbox v-if="VAULT.dropboxFiles.length === 0 && online" />
    <div
      v-for="(file, index) in VAULT.dropboxFiles"
      :key="index"
      class="flex flex-col w-full flex-wrap justify-start md:justify-between items-center bg-theme-editor-dashboard-background-main wb-text rounded my-1 shadow-binset transition-shadow hover:shadow-xl"
    >
      <div class="flex items-center justify-start p-1 bg-black-opacity w-full">
        <div class="flex gap-2 items-center">
          <div>
            <IconDropbox class="w-7 h-7" />
          </div>
          <h2 class="text-sm font-bold">
            {{ t('editor.bar.dropbox.title') }}
          </h2>
        </div>
      </div>
      <div class="flex flex-col justify-between w-full p-2">
        <h2 class="text-sm font-bold text-center">{{ file.name }}</h2>
        <div class="flex justify-end flex-1 mt-5 items-center w-full">
          <div>
            <IconDelete
              class="wb-icon w-8 h-8 lg:(w-6 h-6)"
              @click.prevent.stop="dropbox.deleteProject(file)"
            />
          </div>
          <div>
            <IconEnter
              class="wb-icon w-8 h-8 lg:(w-6 h-6)"
              @click.prevent.stop="dropbox.loadProject(file)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useVaultStore } from '@/store/vault'
  import { useDropbox } from '@/use/storage/dropbox'
  import { useOnline } from '@vueuse/core'
  import { ProjectDocument } from 'better-write-types'
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const VAULT = useVaultStore()

  const dropbox = useDropbox()
  const { t } = useI18n()
  const online = useOnline()

  const projects = ref<ProjectDocument[]>(VAULT.documents || [])
  const isFetched = ref<boolean>(false)

  const onSetDocuments = (force = false) => {
    if (VAULT.documents && !force) {
      projects.value = VAULT.documents

      isFetched.value = true

      return
    }
  }

  onMounted(() => {
    onSetDocuments()
  })
</script>
