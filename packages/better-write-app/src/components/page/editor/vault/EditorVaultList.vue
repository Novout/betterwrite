<template>
  <div
    class="flex flex-col justify-start items-stretch gap-2 bg-black-opacity p-5 max-h-100 wb-scroll overflow-y-auto"
  >
  <Spinner v-if="!isFetched" :width="80" :height="80" />
  <div
    v-for="(context, index) in projects"
    v-else-if="projects.length !== 0"
    :key="index"
    class="flex flex-col w-full flex-wrap justify-start md:justify-between items-center bg-theme-editor-dashboard-background-main wb-text rounded my-1 shadow-binset transition-shadow hover:shadow-xl"
  >
    <div class="flex items-center justify-between p-1 bg-black-opacity w-full">
      <div v-if="context.project.type === 'blank'" class="flex gap-2 items-center">
        <div>
          <IconPaper class="w-7 h-7" />
        </div>
        <h2 class="text-sm font-bold">
          {{ t('editor.new.blank.title') }}
        </h2>
      </div>
      <div v-else-if="context.project.type === 'creative'" class="flex gap-2 items-center">
        <div>
          <IconBook class="w-7 h-7" />
        </div>
        <h2 class="text-sm font-bold">
          {{ t('editor.new.creative.title') }}
        </h2>
      </div>
      <div v-else-if="context.project.type === 'only-annotations'" class="flex gap-2 items-center">
        <div>
          <IconAnnotation class="w-7 h-7" />
        </div>
        <h2 class="text-sm font-bold">
          {{ t('editor.new.annotation.title') }}
        </h2>
      </div>
      <p class="text-sm text-center">{{ supabase.getProjectSize(context) }}</p>
    </div>
    <div class="flex flex-col justify-between w-full p-2">
      <h2 class="text-sm font-bold text-center">{{ context.project.nameRaw }}</h2>
      <div class="flex justify-end flex-1 mt-5 items-center w-full">
        <div>
          <IconDelete
            class="wb-icon w-8 h-8 lg:(w-6 h-6)"
            @click.prevent.stop="onDeleteProject(context)"
          />
        </div>
        <div>
          <IconEnter
            class="wb-icon w-8 h-8 lg:(w-6 h-6)"
            @click.prevent.stop="supabase.loadProject(context)"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="wb-text">
    {{ t('dashboard.projects.empty') }}
  </div>
</div>
</template>

<script setup lang="ts">
  import { useSupabase } from '@/use/storage/supabase'
  import { ProjectObject } from 'better-write-types'
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const supabase = useSupabase()
  const { t } = useI18n()

  const projects = ref<ProjectObject[]>([])
  const isFetched = ref<boolean>(false)

  const onSetProject = () => {
    supabase
      .getProjects()
      .then((_projects) => {
        projects.value = _projects as ProjectObject[]
      })
      .finally(() => {
        isFetched.value = true
      })
  }

  onMounted(() => {
    onSetProject()
  })

  const onDeleteProject = (context: ProjectObject) => {
    supabase.deleteProject(context).then(() => {
      onSetProject()
    })
  }
</script>
