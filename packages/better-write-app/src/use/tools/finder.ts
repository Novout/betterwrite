import { useAbsoluteStore } from '@/store/absolute'
import { useContextStore } from '@/store/context'
import { useExternalsStore } from '@/store/externals'
import { useProjectStore } from '@/store/project'
import { ContextState, Entity } from 'better-write-types'
import { nextTick, reactive } from 'vue'
import { useScroll } from '../scroll'
import { useStorage } from '../storage/storage'

export const useFinder = () => {
  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()
  const EXTERNALS = useExternalsStore()
  const ABSOLUTE = useAbsoluteStore()

  const storage = useStorage()
  const scroll = useScroll()

  const state = reactive({
    entry: '',
    actuallyLetterCounter: 0 as number,
    actuallyLetterRaw: '' as string,
    listOfLettersExists: [] as Array<Record<string, any>>,
    maxLetterCounter: 0 as number,
  })

  const onFinder = () => {
    state.listOfLettersExists = []
    state.actuallyLetterCounter = 0
    state.actuallyLetterRaw = ''
    state.maxLetterCounter = 0

    EXTERNALS.finder.value = state.entry

    PROJECT.pages.forEach((context: ContextState) => {
      context.entities.forEach((entity: Entity) => {
        const raw = entity.raw.split(' ')

        raw.forEach((word) => {
          if (!state.entry) return

          if (word.includes(state.entry)) {
            state.listOfLettersExists.push({ entity, page: context })
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

    const pageIndex = PROJECT.pages.indexOf(object.page)
    const entityIndex = PROJECT.pages[pageIndex].entities.indexOf(object.entity)

    EXTERNALS.finder.entity = entityIndex

    storage.normalize().then(() => {
      onGo(`entity-${entityIndex}`, object.page)
    })
  }

  const onGo = async (go: string | symbol, page: ContextState) => {
    if (!ABSOLUTE.shortcuts.finder && !ABSOLUTE.shortcuts.switcher) return

    if (CONTEXT.id !== page.id) CONTEXT.load(page)

    await nextTick

    scroll.to(`#${String(go)}`, 'center')
  }

  const onUp = () => {
    if (!state.entry) return

    if (state.actuallyLetterCounter >= state.maxLetterCounter) {
      onSearchGo(state.listOfLettersExists[0])
    } else {
      const object = state.listOfLettersExists[state.actuallyLetterCounter]

      onSearchGo(object)
    }
  }

  const onDown = () => {
    if (!state.entry) return

    if (state.actuallyLetterCounter <= 1) {
      onSearchGo(
        state.listOfLettersExists[state.listOfLettersExists.length - 1]
      )
    } else {
      const object = state.listOfLettersExists[state.actuallyLetterCounter - 2]

      onSearchGo(object)
    }
  }

  return { state, onFinder, onSearchGo, onGo, onUp, onDown }
}
