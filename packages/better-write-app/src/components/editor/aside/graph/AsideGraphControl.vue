<template>
  <div v-if="project.isCreativeProject()" class="flex items-center">
    <HeroIcon class="wb-icon" @click.prevent.stop="page.onCreatePage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="h-6 w-6"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
          fill="currentColor"
        ></path>
      </svg>
    </HeroIcon>
    <HeroIcon class="wb-icon" @click.prevent.stop="page.onUpPage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="h-6 w-6"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8l-8 8z"
          fill="currentColor"
        ></path>
      </svg>
    </HeroIcon>
    <HeroIcon class="wb-icon" @click.prevent.stop="page.onDownPage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="h-6 w-6"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8l8-8z"
          fill="currentColor"
        ></path>
      </svg>
    </HeroIcon>
    <HeroIcon class="wb-icon" @click.prevent.stop="page.onDeletePage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="h-6 w-6"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z"
          fill="currentColor"
        ></path>
      </svg>
    </HeroIcon>
  </div>
</template>

<script setup lang="ts">
  import { usePage } from '@/use/page'
  import { useProject } from '@/use/project'

  const page = usePage()
  const project = useProject()
</script>
