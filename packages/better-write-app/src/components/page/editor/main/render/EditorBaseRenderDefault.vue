<template>
  <div
    class="relative flex justify-between wb-edit flex-col w-full overflow-x-hidden"
  >
    <section
      id="edit"
      ref="editor"
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0 }"
      :delay="100"
      :class="[project.isBlankProject() ? 'pt-28' : '']"
      class="flex flex-col w-full wb-scroll overflow-x-hidden"
    >
      <EditorEntityDefault
        v-for="(element, index) in CONTEXT.entities"
        :id="`entity-${String(index)}`"
        :key="index"
        :entity="element"
      />
    </section>
    <EditorBaseRenderBar />
  </div>
</template>

<script lang="ts" setup>
  import { useProject } from '@/use/project'
  import { useContextStore } from '@/store/context'
  import { ref, watch } from 'vue'
  import { tryOnMounted, useScroll as useScr } from '@vueuse/core'
  import { useAbsoluteStore } from '@/store/absolute'
  import { useScroll } from '@/use/scroll'
  import { useExternalsStore } from '@/store/externals'

  const EXTERNALS = useExternalsStore()
  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()

  const project = useProject()

  const editor = ref<HTMLElement | null>(null)

  const scr = useScr(editor as any)
  const scroll = useScroll()

  watch(scr.isScrolling, () => {
    ABSOLUTE.entity.menu = false
  })

  tryOnMounted(() => {
    if (EXTERNALS.switcher.close) {
      scroll.entity(EXTERNALS.switcher.entity, 'center')

      EXTERNALS.switcher.close = false

      return
    }

    if (EXTERNALS.finder.close) {
      scroll.entity(EXTERNALS.finder.entity, 'center')

      EXTERNALS.finder.close = false
    }
  })
</script>
