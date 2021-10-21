<template>
  <div
    ref="main"
    class="
      w-full
      flex flex-col
      overflow-hidden
      h-screen
      bg-gray-100
      dark:bg-gray-700
    "
    :class="[EDITOR.configuration.draggable ? 'fixed' : 'inline-block']"
    @click.prevent="onClickInEditor"
  >
    <EditorBaseHeader v-if="PROJECT.name !== env.projectEmpty()" />
    <EditorBaseBlocked v-if="PROJECT.name === env.projectEmpty()" />
    <section
      id="edit"
      :class="[project.isBlankProject() ? 'pt-28' : '']"
      class="
        flex flex-col
        w-full
        max-h-screen
        overflow-y-auto overflow-x-hidden
        bg-gray-100
        dark:bg-gray-700
      "
    >
      <EditorEntityShow
        v-for="(entities, index) in CONTEXT.entities"
        :id="`entities-${String(index)}`"
        :key="index"
        :entities="entities"
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
  import { ref, nextTick } from 'vue'
  import { Entity } from '@/types/context'
  import { useScroll } from '@/use/scroll'
  import { useEnv } from '@/use/env'
  import useEmitter from '@/use/emitter'
  import { useProject } from '@/use/project'
  import { useContextStore } from '@/store/context'
  import { useProjectStore } from '@/store/project'
  import { useEditorStore } from '@/store/editor'

  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()

  const emitter = useEmitter()
  const project = useProject()
  const env = useEnv()

  const main = ref<HTMLElement | null>(null)
  const entry = ref<string>('')

  const enterListener = async (content: Entity) => {
    CONTEXT.addInPage(content)

    await nextTick()

    useScroll().force('#edit')

    resetListener()
  }

  const resetListener = () => {
    entry.value = ''
  }

  const onClickInEditor = () => {
    emitter.emit('entity-input-focus')
  }
</script>
