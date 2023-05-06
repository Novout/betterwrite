<template>
  <section
    id="edit"
    ref="editor"
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0 }"
    :delay="100"
    :class="[project.isBlankProject() ? 'pt-28' : '']"
    class="flex wb-edit flex-col w-full overflow-y-auto wb-scroll overflow-x-hidden"
  >
    <EditorEntityFinderInput
      v-for="(element, index) in shallowed"
      :id="`entity-${String(index)}`"
      :key="index"
      :entity="element"
    />
  </section>
</template>

<script lang="ts" setup>
  import { useProject } from '@/use/project'
  import { useContextStore } from '@/store/context'
  import { ref, watch, shallowRef } from 'vue'
  import { useScroll } from '@vueuse/core'
  import { useAbsoluteStore } from '@/store/absolute'

  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()

  const project = useProject()

  const editor = ref<HTMLElement | null>(null)

  const scroll = useScroll(editor as any)

  const shallowed = shallowRef(CONTEXT.entities)

  watch(scroll.isScrolling, () => {
    ABSOLUTE.entity.menu = false
  })
</script>
