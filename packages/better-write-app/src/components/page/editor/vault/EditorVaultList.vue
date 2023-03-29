<template>
  <div
    class="flex flex-col justify-start items-stretch gap-2 bg-black-opacity p-5 max-h-100 wb-scroll overflow-y-auto"
  >
  <Spinner v-if="!isFetched" :width="80" :height="80" />
  <div
    v-for="({ document }, index) in projects"
    v-else-if="projects.length !== 0"
    :key="index"
    class="flex flex-col w-full flex-wrap justify-start md:justify-between items-center bg-theme-editor-dashboard-background-main wb-text rounded my-1 shadow-binset transition-shadow hover:shadow-xl"
  >
    <div class="flex items-center justify-start p-1 bg-black-opacity w-full">
      <div v-if="document.type === 'blank'" class="flex gap-2 items-center">
        <div>
          <IconPaper class="w-7 h-7" />
        </div>
        <h2 class="text-sm font-bold">
          {{ t('editor.new.blank.title') }}
        </h2>
      </div>
      <div v-else-if="document.type === 'creative'" class="flex gap-2 items-center">
        <div>
          <IconBook class="w-7 h-7" />
        </div>
        <h2 class="text-sm font-bold">
          {{ t('editor.new.creative.title') }}
        </h2>
      </div>
      <div v-else-if="document.type === 'only-annotations'" class="flex gap-2 items-center">
        <div>
          <IconAnnotation class="w-7 h-7" />
        </div>
        <h2 class="text-sm font-bold">
          {{ t('editor.new.annotations.title') }}
        </h2>
      </div>
    </div>
    <div class="flex flex-col justify-between w-full p-2">
      <h2 class="text-sm font-bold text-center">{{ document.name }}</h2>
      <div class="flex justify-end flex-1 mt-5 items-center w-full">
        <div>
          <IconDelete
            class="wb-icon w-8 h-8 lg:(w-6 h-6)"
            @click.prevent.stop="onDeleteProject(document.id)"
          />
        </div>
        <div>
          <IconEnter
            class="wb-icon w-8 h-8 lg:(w-6 h-6)"
            @click.prevent.stop="supabase.loadProjectById(document.id)"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="wb-text text-center font-bold">
    {{ t('editor.vault.empty') }}
  </div>
</div>
</template>

<script setup lang="ts">
  import { useSupabase } from '@/use/storage/supabase'
  import { ProjectDocument, ID } from 'better-write-types'
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const supabase = useSupabase()
  const { t } = useI18n()

  const projects = ref<ProjectDocument[]>([])
  const isFetched = ref<boolean>(false)

  const onSetProject = () => {
    supabase.getDocuments().then((_projects) => {
      projects.value = _projects || []
    })
    .finally(() => {
      isFetched.value = true
    })
  }

  onMounted(async () => {
    onSetProject()
  })

  const onDeleteProject = (id: ID<number>) => {
    supabase.deleteProject(id).then(() => {
      onSetProject()
    })
  }
</script>
