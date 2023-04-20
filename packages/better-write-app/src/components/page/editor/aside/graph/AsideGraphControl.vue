<template>
  <div v-if="project.isCreativeProject()" class="flex items-center">
    <IconAdd
      class="wb-icon w-9 h-9 md:(w-6 h-6)"
      @click.prevent.stop="page.onCreatePage()"
    />
    <IconArrowRight
      :class="[value ? 'transform rotate-90' : '']"
      class="wb-icon w-9 h-9 md:(w-7 h-7)"
      @click.prevent.stop="toggle()"
    />
  </div>
</template>

<script setup lang="ts">
  import { usePage } from '@/use/page'
  import { useProject } from '@/use/project'

  defineProps<{
    value: boolean
    toggle: (value?: boolean | undefined) => boolean
  }>()

  const page = usePage()
  const project = useProject()
</script>
