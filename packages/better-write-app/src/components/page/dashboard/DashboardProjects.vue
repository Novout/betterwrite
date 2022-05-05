<template>
  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="500"
    class="flex flex-col w-full p-5"
  >
    <h2 class="text-2xl font-bold wb-text my-5">
      {{ t('dashboard.projects.title') }}
    </h2>
    <div
      class="flex flex-wrap flex-row justify-start items-center gap-10 bg-black-opacity p-5"
    >
      <div
        v-for="(context, index) in projects"
        v-if="projects.length !== 0"
        :key="index"
        class="flex flex-col w-full sm:w-52 flex-wrap justify-center md:justify-between items-center p-5 bg-theme-editor-dashboard-background-main wb-text rounded my-1 shadow-binset"
      >
        <div
          v-if="context.pdf.styles.base.background.data"
          class="flex items-center justify-center h-60 w-42 bg-cover"
        >
          <img :src="context.pdf.styles.base.background.data" />
        </div>
        <div v-else class="flex items-center justify-center h-60">
          <IconImage class="h-22 w-22" />
        </div>
        <div class="flex justify-center mt-5 items-center w-full">
          <p class="text-lg truncate">{{ context.project.nameRaw }}</p>
          <IconDelete
            class="wb-icon w-8 h-8"
            @click.prevent.stop="onDeleteProject(context)"
          />
          <IconEnter
            class="wb-icon w-8 h-8"
            @click.prevent.stop="supabase.loadProject(context)"
          />
        </div>
        <p class="text-lg">{{ supabase.getProjectSize(context) }}</p>
      </div>
      <div v-else class="wb-text">
        {{ t('dashboard.projects.empty') }}
      </div>
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

  const onSetProject = () => {
    supabase.getProjects().then((_projects) => {
      projects.value = _projects as ProjectObject[]
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
