<template>
  <div class="flex gap-2 wb-text w-full relative px-4 md:px-14">
    <EditorEntityDefaultInput :entity="entity" />
  </div>
</template>

<script setup lang="ts">
  import { Entity } from 'better-write-types'

  defineProps<{
    entity: Entity
  }>()
</script>
