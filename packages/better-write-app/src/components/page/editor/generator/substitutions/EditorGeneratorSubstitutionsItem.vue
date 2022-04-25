<template>
  <div class="flex items-center w-full gap-5 wb-text">
    <InputBoolean v-model="template.active" :specific="true" />
    <InputText
      v-model="template.old"
      class="flex-1 p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider"
    />
    <InputText
      v-model="template.new"
      class="flex-1 p-2 shadow-lg bg-theme-background-2 rounded-xl tracking-wider"
    />
  </div>
</template>

<script setup lang="ts">
  import { ProjectStateTemplatesSubstitutionsText } from 'better-write-types'

  defineProps<{
    template: ProjectStateTemplatesSubstitutionsText
  }>()
</script>
