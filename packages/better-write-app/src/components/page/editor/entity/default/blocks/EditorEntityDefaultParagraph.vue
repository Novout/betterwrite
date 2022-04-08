<template>
  <EditorEntityDefaultContainer :entity="props.entity">
    <EditorEntityDefaultInput :entity="props.entity" />
  </EditorEntityDefaultContainer>
</template>

<script setup lang="ts">
  import { Entity } from 'better-write-types'

  const props = defineProps<{
    entity: Entity
  }>()
</script>
