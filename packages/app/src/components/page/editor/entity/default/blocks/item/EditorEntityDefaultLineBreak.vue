<template>
  <EditorEntityDefaultContainer :entity="props.entity">
    <div class="flex items-center py-6 justify-center w-full">
      <div
        class="cursor-default border-b-8 border-dashed border-theme-editor-entity-line w-full"
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
