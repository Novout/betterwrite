<template>
  <section
    id="edit"
    ref="editor"
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
  import { ref, watch } from 'vue'
  import { useScroll } from '@vueuse/core'
  import { useAbsoluteStore } from '@/store/absolute'

  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()

  const project = useProject()
  const storage = useStorage()
  const emitter = useEmitter()

  const editor = ref<HTMLElement | null>(null)

  const scroll = useScroll(editor)

  watch(scroll.isScrolling, () => {
    ABSOLUTE.entity.menu = false
  })
</script>
