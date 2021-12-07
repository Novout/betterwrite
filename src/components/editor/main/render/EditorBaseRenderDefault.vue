<template>
  <section
    id="edit"
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="100"
    :class="[project.isBlankProject() ? 'pt-28' : '']"
    class="flex flex-col w-full min-h-editor overflow-y-auto overflow-x-hidden"
  >
    <Draggable
      :list="CONTEXT.entities"
      group="entities"
      item-key="id"
      @start="storage.normalize()"
      @end="emitter.emit('entity-reset')"
    >
      <template #item="{ element, index }">
        <EditorEntityDefaultInput
          :id="`entity-${String(index)}`"
          :key="index"
          :entity="element"
        />
      </template>
    </Draggable>
  </section>
</template>

<script lang="ts" setup>
  import { useProject } from '@/use/project'
  import { useContextStore } from '@/store/context'
  import { useStorage } from '@/use/storage/storage'
  import useEmitter from '@/use/emitter'
  import Draggable from 'vuedraggable'

  const CONTEXT = useContextStore()

  const project = useProject()
  const storage = useStorage()
  const emitter = useEmitter()
</script>
