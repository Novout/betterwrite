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
    :class="[
      store.state.editor.configuration.draggable ? 'fixed' : 'inline-block',
    ]"
    @click.prevent="onClickInEditor"
  >
    <EditorBaseHeader v-if="store.state.project.name !== env.projectEmpty()" />
    <EditorBaseBlocked v-if="store.state.project.name === env.projectEmpty()" />
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
        v-for="(entity, index) in store.state.context.entity"
        :id="`entity-${String(index)}`"
        :key="index"
        :entity="entity"
      />
      <EditorEntityInput
        v-if="store.state.project.name !== env.projectEmpty()"
        v-model="entry"
        @enter="enterListener"
        @reset="resetListener"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue'
  import { useStore } from 'vuex'
  import { ContextStatePageContent } from '@/types/context'
  import { useScroll } from '@/use/scroll'
  import { useEnv } from '@/use/env'
  import useEmitter from '@/use/emitter'
  import { useProject } from '@/use/project'

  const store = useStore()
  const emitter = useEmitter()
  const project = useProject()
  const env = useEnv()

  const main = ref<HTMLElement | null>(null)
  const entry = ref<string>('')

  const enterListener = async (content: ContextStatePageContent) => {
    store.commit('context/addInPage', content)

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
