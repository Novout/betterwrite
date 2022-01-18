<template>
  <div class="flex flex-col w-full p-2 md:p-10">
    <h2 class="text-2xl font-bold wb-text my-5">
      {{ t('dashboard.projects') }}
    </h2>
    <div class="flex flex-wrap flex-row justify-start items-center gap-10">
      <div
        v-for="(context, index) in projects"
        :key="index"
        class="flex flex-col w-full sm:w-52 flex-wrap justify-between items-center p-5 bg-theme-background-2 wb-text rounded my-1 shadow-binset"
      >
        <div
          v-if="context.pdf.styles.base.background.data"
          class="flex items-center justify-center h-60 bg-cover"
        >
          <img :src="context.pdf.styles.base.background.data" />
        </div>
        <div v-else class="flex items-center justify-center h-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="h-24 w-24"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 512 512"
          >
            <ellipse
              cx="373.14"
              cy="219.33"
              rx="46.29"
              ry="46"
              fill="none"
            ></ellipse>
            <path
              d="M80 132v328a20 20 0 0 0 20 20h392a20 20 0 0 0 20-20V132a20 20 0 0 0-20-20H100a20 20 0 0 0-20 20zm293.14 41.33a46 46 0 1 1-46.28 46a46.19 46.19 0 0 1 46.28-46zm-261.41 276v-95.48l122.76-110.2L328.27 337l-113 112.33zm368.27 0H259l144.58-144L480 370.59z"
              fill="currentColor"
            ></path>
            <path
              d="M20 32A20 20 0 0 0 0 52v344a20 20 0 0 0 20 20h28V100a20 20 0 0 1 20-20h380V52a20 20 0 0 0-20-20z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div class="flex justify-between items-center w-full">
          <p class="text-lg">{{ context.project.nameRaw }}</p>
          <HeroIcon
            class="wb-icon"
            @click.prevent.stop="supabase.loadProject(context)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              class="h-8 w-8"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 512 512"
            >
              <path
                d="M160 136v104h153.37l-52.68-52.69a16 16 0 0 1 22.62-22.62l80 80a16 16 0 0 1 0 22.62l-80 80a16 16 0 0 1-22.62-22.62L313.37 272H160v104a56.06 56.06 0 0 0 56 56h208a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56H216a56.06 56.06 0 0 0-56 56z"
                fill="currentColor"
              ></path>
              <path
                d="M48 240a16 16 0 0 0 0 32h112v-32z"
                fill="currentColor"
              ></path>
            </svg>
          </HeroIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useSupabase } from '@/use/storage/supabase'
  import { ProjectObject } from 'better-write-types'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const supabase = useSupabase()
  const { t } = useI18n()

  const projects = ref<ProjectObject[]>([])

  supabase.getProjects().then((_projects) => {
    projects.value = _projects as ProjectObject[]
  })
</script>
