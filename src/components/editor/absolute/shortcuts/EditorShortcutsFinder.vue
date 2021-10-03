<template>
  <div
    class="
      absolute
      top-1/2
      left-1/2
      transform
      duration-700
      -translate-x-1/2 -translate-y-1/2
      w-60
      bg-white
      dark:bg-gray-800
      p-2
      rounded
      transition
      shadow-2xl
    "
  >
    <div class="flex flex-col w-full">
      <div class="flex items-center justify-between w-full mb-1">
        <div class="wb-text font-poppins">
          {{ state.actuallyLetterCounter }} / {{ state.maxLetterCounter }}
        </div>
        <div>
          <HeroIcon class="text-2xs wb-icon" @click.prevent="onClose">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </HeroIcon>
        </div>
      </div>
      <input
        ref="search"
        v-model="state.entry"
        class="bg-transparent border border-gray-900 px-1 mb-1 wb-text"
        :placeholder="t('editor.text.placeholder.shortcuts.finderEntry')"
        @input="onFinder"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed, nextTick } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useStore } from 'vuex'
  import { ContextState } from '@/types/context'
  import { ContextStatePageContent } from '@/types/context'
  import { useScroll } from '@/use/scroll'

  const { t } = useI18n()
  const store = useStore()

  const pages = computed(() => store.state.project.pages)

  const state = reactive({
    entry: '' as string,
    actuallyLetterCounter: 0 as number,
    actuallyLetterRaw: '' as string,
    listOfLettersExists: [] as Array<Record<string, any>>,
    maxLetterCounter: 0 as number,
  })
  const search = ref<HTMLElement | null>(null)

  const onFinder = () => {
    state.listOfLettersExists = []
    state.actuallyLetterCounter = 0
    state.actuallyLetterRaw = ''
    state.maxLetterCounter = 0

    pages.value.forEach((context: ContextState) => {
      context.entity.forEach((entity: ContextStatePageContent) => {
        const letters = entity.raw.split(' ')

        letters.forEach((letter: string) => {
          if (letter === state.entry) {
            state.listOfLettersExists.push({ letter, entity, page: context })
            state.maxLetterCounter++
          }
        })
      })
    })

    if (state.maxLetterCounter === 0) return

    onSearchGo(state.listOfLettersExists[0])
  }

  const onSearchGo = (object: Record<string, any>) => {
    state.actuallyLetterRaw = object.letter
    state.actuallyLetterCounter = state.listOfLettersExists.indexOf(object) + 1

    const pageIndex = store.state.project.pages.indexOf(object.page)
    const entityIndex = store.state.project.pages[pageIndex].entity.indexOf(
      object.entity
    )

    onGo(`entity-${entityIndex}`, object.page)
  }

  const onGo = async (go: string | symbol, page: ContextState) => {
    if (store.state.context.id !== page.id) store.commit('context/load', page)
    await nextTick
    useScroll().to(`#${String(go)}`)
  }

  const onClose = () => {
    store.commit('absolute/switchShortcutFinder', false)
  }

  onMounted(() => {
    search.value?.focus()
  })
</script>
