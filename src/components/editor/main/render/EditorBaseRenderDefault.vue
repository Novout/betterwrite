<template>
  <section
    id="edit"
    :class="[project.isBlankProject() ? 'pt-28' : '']"
    class="flex flex-col w-full min-h-editor overflow-y-auto overflow-x-hidden"
  >
    <EditorEntityDefaultShow
      v-for="(entity, index) in entities"
      :id="`entity-${String(index)}`"
      :key="index"
      :entity="entity"
    />
    <EditorEntityDefaultInput
      v-if="PROJECT.name !== env.projectEmpty()"
      v-model="entry"
      @enter="enterListener"
      @reset="resetListener"
    />
  </section>
</template>

<script lang="ts" setup>
  import { ref, nextTick, computed } from 'vue'
  import { Entity } from '@/types/context'
  import { useScroll } from '@/use/scroll'
  import { useEnv } from '@/use/env'
  import { useProject } from '@/use/project'
  import { useContextStore } from '@/store/context'
  import { useProjectStore } from '@/store/project'
  import usePlugin from '@/use/plugin/core'

  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()

  const project = useProject()
  const plugin = usePlugin()
  const env = useEnv()

  const entry = ref<string>('')

  const entities = computed(() => CONTEXT.entities)

  const enterListener = async (content: Entity) => {
    CONTEXT.addInPage(content)

    await nextTick

    useScroll().force('#edit')

    resetListener()

    await nextTick

    plugin.emit('plugin-entity-create', {
      data: content.raw,
      index: CONTEXT.entities.indexOf(content),
    })
  }

  const resetListener = () => {
    entry.value = ''
  }
</script>
