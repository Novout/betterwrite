<template>
  <EditorEntityDefaultContainer :entity="props.entity">
    <div class="flex items-center py-6 justify-center w-full">
      <div
        class="cursor-default h-2 border-b-8 border-theme-border-1 border-theme-editor-entity-page w-full"
      />
    </div>
  </EditorEntityDefaultContainer>
</template>

<script setup lang="ts">
  import { Entity } from 'better-write-types'

  const props = defineProps<{
    entity: Entity
  }>()
</script>
