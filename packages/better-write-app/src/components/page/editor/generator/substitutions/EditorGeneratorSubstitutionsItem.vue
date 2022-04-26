<template>
  <div class="flex items-center w-full gap-5 wb-text">
    <InputBoolean v-model="template.active" class="w-24" :specific="true" />
    <InputText
      v-model="template.old"
      class="p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider w-full"
    />
    <InputText
      v-model="template.new"
      class="p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider w-full"
    />
  </div>
</template>

<script setup lang="ts">
  import { ProjectStateTemplatesSubstitutionsText } from 'better-write-types'

  defineProps<{
    template: ProjectStateTemplatesSubstitutionsText
  }>()
</script>
