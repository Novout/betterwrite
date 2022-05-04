<template>
  <EditorEntityDefaultContainer :entity="props.entity">
    <EditorEntityDefaultText :is-attached="false" :entity="props.entity" />
  </EditorEntityDefaultContainer>
</template>

<script setup lang="ts">
  import { Entity } from 'better-write-types'

  const props = defineProps<{
    entity: Entity
  }>()
</script>
