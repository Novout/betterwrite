<template>
  <section
    id="edit"
    :class="[project.isBlankProject() ? 'pt-28' : '']"
    class="flex flex-col w-full min-h-editor overflow-y-auto overflow-x-hidden"
  >
    <EditorEntityDefaultInput
      v-for="(entity, index) in entities"
      :id="`entity-${String(index)}`"
      :key="index"
      :entity="entity"
    />
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useProject } from '@/use/project'
  import { useContextStore } from '@/store/context'

  const CONTEXT = useContextStore()

  const project = useProject()

  const entities = computed(() => CONTEXT.entities)
</script>
