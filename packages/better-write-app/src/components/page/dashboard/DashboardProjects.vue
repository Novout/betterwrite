<template>
  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :delay="500"
    class="flex flex-col w-full p-5"
  >
    <h2 class="text-2xl font-poppins font-bold wb-text my-5">
      {{ t('dashboard.projects.title') }}
    </h2>
    <div
      class="flex flex-wrap flex-row justify-start items-center gap-10 bg-black-opacity p-5"
    >
      <Spinner v-if="!isLoadded" :width="80" :height="80" />
      <div
        v-for="(context, index) in projects"
        v-else-if="projects.length !== 0"
        :key="index"
        class="flex flex-col w-full sm:w-52 flex-wrap justify-center md:justify-between items-center p-5 bg-theme-editor-dashboard-background-main wb-text rounded my-1 shadow-binset"
      >
        <div
          v-if="context.project.image"
          class="flex items-center justify-center h-60 w-42 bg-cover cursor-pointer"
          @click="onNewImage(context)"
        >
          <img :src="context.project.image" />
        </div>
        <div v-else class="flex items-center justify-center h-60">
          <IconImage
            class="h-22 w-22 cursor-pointer"
            @click="onNewImage(context)"
          />
        </div>
        <div class="flex justify-center mt-5 items-center w-full">
          <p class="text-lg truncate">{{ context.project.nameRaw }}</p>
          <div>
            <IconDelete
              class="wb-icon w-8 h-8"
              @click.prevent.stop="onDeleteProject(context)"
            />
          </div>
          <div>
            <IconEnter
              class="wb-icon w-8 h-8"
              @click.prevent.stop="supabase.loadProject(context)"
            />
          </div>
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
  import { useProjectStore } from '@/store/project'
  import { useSupabase } from '@/use/storage/supabase'
  import { useUtils } from '@/use/utils'
  import { ProjectObject } from 'better-write-types'
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const PROJECT = useProjectStore()

  const supabase = useSupabase()
  const utils = useUtils()
  const { t } = useI18n()

  const projects = ref<ProjectObject[]>([])
  const isLoadded = ref<boolean>(false)

  const onSetProject = () => {
    supabase
      .getProjects()
      .then((_projects) => {
        projects.value = _projects as ProjectObject[]
      })
      .finally(() => {
        isLoadded.value = true
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

  const onNewImage = (context: ProjectObject) => {
    const _ = document.createElement('input')
    _.type = 'file'
    _.addEventListener('change', function () {
      const file = (this.files as any)[0]

      if (!file) return

      const reader = new FileReader()

      if (file.name.endsWith('svg')) {
        reader.readAsText(file)
      } else {
        reader.readAsDataURL(file)
      }

      reader.onload = function () {
        context.project.image = reader.result as string

        supabase.saveProject(context).then(() => {
          onSetProject()
        })
      }
      reader.onerror = function () {}
    })
    _.click()
  }
</script>
