<template>
  <div
    class="md:px-20 px-2 h-screen flex items-center"
    @click.prevent="onClickInEditor"
  >
    <div
      ref="main"
      class="
        md:w-8/12
        w-full
        h-editor-mobile
        md:h-editor
        bg-gray-100
        dark:bg-gray-700
      "
      :class="[
        store.state.editor.configuration.draggable ? 'fixed' : 'inline-block',
      ]"
      :style="style"
      style="
        box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
          rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
      "
    >
      <EditorBaseHeader
        v-if="store.state.project.name !== useEnv().projectEmpty()"
      />
      <EditorBaseBlocked
        v-if="store.state.project.name === useEnv().projectEmpty()"
      />
      <section
        id="edit"
        class="
          flex flex-col
          w-full
          overflow-y-auto
          max-h-editor
          px-14
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
          v-if="store.state.project.name !== useEnv().projectEmpty()"
          v-model="entry"
          @enter="enterListener"
          @reset="resetListener"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue'
  import { useStore } from 'vuex'
  import { useDraggable } from '@vueuse/core'
  import { ContextStatePageContent } from '@/types/context'
  import { useScroll } from '@/use/scroll'
  import { useEnv } from '@/use/env'

  const store = useStore()

  const main = ref<HTMLElement | null>(null)
  const entry = ref<string>('')

  const { style } = useDraggable(main as any, {
    initialValue: { x: 100, y: 20 },
  })

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
    const input = document.getElementById('main-input-define')

    if (!input) return

    input.focus()
  }
</script>
