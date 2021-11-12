<template>
  <div
    ref="main"
    class="
      w-full
      flex flex-col
      overflow-hidden
      h-screen
      bg-theme-editor-background
      hover:bg-theme-editor-background-hover
      active:bg-theme-editor-background-active
    "
    :class="[EDITOR.configuration.draggable ? 'fixed' : 'inline-block']"
  >
    <EditorBaseHeader />
    <EditorBaseBlocked v-if="PROJECT.name === env.projectEmpty()" />
    <section
      id="edit"
      :class="[project.isBlankProject() ? 'pt-28' : '']"
      class="
        flex flex-col
        w-full
        max-h-screen
        overflow-y-auto overflow-x-hidden
      "
    >
      <EditorEntityShow
        v-for="(entity, index) in entities"
        :id="`entity-${String(index)}`"
        :key="index"
        :entity="entity"
      />
      <EditorEntityInput
        v-if="PROJECT.name !== env.projectEmpty()"
        v-model="entry"
        @enter="enterListener"
        @reset="resetListener"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { ref, nextTick, computed } from 'vue'
  import { Entity } from '@/types/context'
  import { useScroll } from '@/use/scroll'
  import { useEnv } from '@/use/env'
  import useEmitter from '@/use/emitter'
  import { useProject } from '@/use/project'
  import { useContextStore } from '@/store/context'
  import { useProjectStore } from '@/store/project'
  import { useEditorStore } from '@/store/editor'
  import usePlugin from '@/use/plugin/core'

  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()

  const emitter = useEmitter()
  const project = useProject()
  const plugin = usePlugin()
  const env = useEnv()

  const main = ref<HTMLElement | null>(null)
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
