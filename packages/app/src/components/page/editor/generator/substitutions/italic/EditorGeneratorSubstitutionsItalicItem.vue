<template>
  <div
    ref="item"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    class="flex items-center w-full gap-5 my-2 wb-text transition-transform cursor-pointer"
  >
    <InputBoolean
      v-model="props.template.active"
      class="w-13"
      :specific="true"
    />
    <InputText
      v-model="props.template.data"
      class="p-2 italic shadow-lg bg-theme-background-2 rounded-xl tracking-wider w-full"
    />
    <IconDelete
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="50"
      class="w-7 h-7 wb-icon"
      @click.prevent.stop="remove"
    />
  </div>
</template>

<script setup lang="ts">
  import { ProjectStateTemplatesSubstitutionsItalic } from 'better-write-types'
  import { useProjectStore } from '@/store/project'

  const props = defineProps<{
    template: ProjectStateTemplatesSubstitutionsItalic
  }>()

  const PROJECT = useProjectStore()

  const remove = () => {
    PROJECT.templates.substitutions.italic =
      PROJECT.templates.substitutions.italic.filter((t) => t !== props.template)
  }
</script>
