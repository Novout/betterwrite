<template>
  <div class="md:px-20 sm:px-0 px-0 h-screen flex items-center">
    <div
      ref="main"
      class="md:w-8/12 w-full h-editor bg-gray-100 dark:bg-gray-700"
      :class="[
        store.state.editor.configuration.draggable ? 'fixed' : 'inline-block',
      ]"
      :style="style"
      style="
        box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
          rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
      "
    >
      <div class="absolute">
        <HeroIcon class="wb-icon inline-flex" @click.prevent="onDeletePage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
            <path
              fill-rule="evenodd"
              d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </HeroIcon>
      </div>
      <EditorBaseBlocked
        v-if="store.state.project.name === '__NOT_CREATED__'"
      />
      <section
        id="edit"
        class="flex flex-col w-full overflow-y-auto max-h-editor px-14"
      >
        <transition-group name="list" tag="p">
          <TextShow
            v-for="entity in store.state.context.entity"
            :id="entity.type + '-' + entity.id"
            :key="entity.id"
            :entity="entity"
          />
        </transition-group>
      </section>
      <TextInput
        v-if="store.state.project.name !== '__NOT_CREATED__'"
        v-model="entry"
        @enter="enterListener"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, nextTick } from 'vue'
  import { useStore } from 'vuex'
  import { useDraggable } from '@vueuse/core'
  import { ContextStatePageContent } from '@/types/context'
  import { useScroll } from '@/use/scroll'

  const store = useStore()

  const main = ref<HTMLElement | null>(null)
  const entry = ref<string>('')

  const { style } = useDraggable(main, { initialValue: { x: 100, y: 20 } })

  const enterListener = async (content: ContextStatePageContent) => {
    store.commit('context/addInPage', content)
    await nextTick

    store.commit('project/updatePage', store.state.context)

    useScroll().force('#edit')

    entry.value = ''
  }

  const onDeletePage = async () => {
    if (store.state.project.pages.length <= 1) return

    store.commit('project/deletePage', store.state.context)
    await nextTick

    store.commit('context/load', store.state.project.pages[0])
  }
</script>

<style scoped>
  .list-enter-active,
  .list-leave-active {
    transition: all 200ms;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
  }
  .list-move {
    transition: transform 300ms;
  }
</style>
