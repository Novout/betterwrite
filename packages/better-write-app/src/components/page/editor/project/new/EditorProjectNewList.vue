<template>
  <div
    class="flex justify-center flex-wrap gap-2 items-center w-full p-2 rounded bg-theme-background-2 border-2 border-theme-border-1 wb-text"
  >
    <IconProjectTypeBook v-if="list.includes('multiple')" class="w-6 h-6" />
    <IconProjectTypeSingle v-if="list.includes('single')" class="w-6 h-6" />
    <IconProjectTypeDocument v-if="list.includes('export')" class="w-6 h-6" />
    <IconProjectTypeAnnotation
      v-if="list.includes('annotation')"
      class="w-6 h-6"
    />
    <IconProjectTypeTools v-if="list.includes('tools')" class="w-6 h-6" />
    <IconProjectTypeStatistics
      v-if="list.includes('statistics')"
      class="w-6 h-6"
    />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    list: (
      | 'annotation'
      | 'export'
      | 'single'
      | 'multiple'
      | 'tools'
      | 'statistics'
    )[]
  }>()
</script>
