<template>
  <section
    ref="list"
    class="flex items-center py-1 gap-4 wb-text w-full relative px-4 md:px-14"
  >
    <div class="h-1 w-1 p-2 bg-theme-background-3 rounded-full"></div>
    <EditorEntityDefaultInput :entity="entity" />
  </section>
</template>

<script setup lang="ts">
  import { Entity } from 'better-write-types'
  import { ref } from 'vue'

  defineProps<{
    entity: Entity
  }>()

  const list = ref<any>()
</script>
