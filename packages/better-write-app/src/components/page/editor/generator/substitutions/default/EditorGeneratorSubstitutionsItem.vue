<template>
  <div
    ref="item"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    class="flex items-center w-full gap-5 wb-text my-2 transition-transform cursor-pointer"
  >
    <InputBoolean
      v-model="props.template.active"
      class="w-26"
      :specific="true"
    />
    <InputText
      v-model="props.template.old"
      class="p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider w-full"
    />
    <InputText
      v-model="props.template.new"
      class="p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider w-full"
    />
    <div class="flex items-center gap-0 md:gap-2">
      <IconDelete
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="50"
        class="w-7 h-7 wb-icon"
        @click.prevent.stop="remove"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ProjectStateTemplatesSubstitutionsText } from 'better-write-types'
  import { useProjectStore } from '@/store/project'

  const props = defineProps<{
    template: ProjectStateTemplatesSubstitutionsText
  }>()

  const PROJECT = useProjectStore()

  const remove = () => {
    PROJECT.templates.substitutions.text =
      PROJECT.templates.substitutions.text.filter((t) => t !== props.template)
  }
</script>
