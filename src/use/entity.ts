import { ContextStatePageContent } from '@/types/context'
import { ContextState } from '@/types/context'
import { useScroll } from '@/use/scroll'
import { useStore } from 'vuex'
import { computed, reactive, nextTick, watch, ref } from 'vue'
import { useEnv } from './env'

export const useEntity = () => {
  const store = useStore()
  const env = useEnv()
  const pages = computed(() => store.state.project.pages)

  const selection = computed(
    () => store.state.editor.actives.text.selection.content
  )
  watch(selection, (_content) => {
    fstate.entry = _content
    sstate.entry = _content

    finder().onFinder()
  })

  const sstate = reactive({
    entry: store.state.editor.actives.text.selection.content || ('' as string),
    output: '' as string,
    equal: true as boolean,
  })
  const sentry = ref<HTMLElement | null>(null)
  const fstate = reactive({
    entry: store.state.editor.actives.text.selection.content || ('' as string),
    actuallyLetterCounter: 0 as number,
    actuallyLetterRaw: '' as string,
    listOfLettersExists: [] as Array<Record<string, any>>,
    maxLetterCounter: 0 as number,
  })

  const utils = () => {
    const entry = (input: string, target: string): boolean => {
      return (
        input.startsWith('/' + target) ||
        input.startsWith('/' + target.toUpperCase())
      )
    }

    const isFixed = (index: number, options?: Record<string, boolean>) => {
      const entity = store.state.context.entity[index]

      if (!entity.type) return false

      if (options?.emptyLine && entity.raw === env.emptyLine()) return true

      return (
        entity.type === 'page-break' ||
        entity.type === 'line-break' ||
        entity.type === 'image'
      )
    }

    return { entry, isFixed }
  }

  const swapper = () => {
    const switcherText = ({ entry, output, equal }: Record<any, any>) => {
      const arr = store.state.context.entity

      // TODO: Deletar em caso de output vazio
      if (!entry || !output) return

      arr.forEach((e: ContextStatePageContent) => {
        const text = e.raw.split(' ')

        text.forEach((t: string) => {
          if (equal && t === entry) {
            store.commit('context/switchEntityRaw', {
              entity: e,
              match: t,
              raw: output,
            })
          } else if (!equal && t.includes(entry)) {
            store.commit('context/switchEntityRaw', {
              entity: e,
              match: entry,
              raw: output,
            })
          }
        })
      })
    }

    const onSwitcherAll = () => {
      switcherText({
        entry: sstate.entry,
        output: sstate.output,
        equal: sstate.equal,
      })
    }

    return { switcherText, onSwitcherAll }
  }

  const finder = () => {
    const onFinder = () => {
      fstate.listOfLettersExists = []
      fstate.actuallyLetterCounter = 0
      fstate.actuallyLetterRaw = ''
      fstate.maxLetterCounter = 0

      pages.value.forEach((context: ContextState) => {
        context.entity.forEach((entity: ContextStatePageContent) => {
          if (!fstate.entry) return

          if (entity.raw.includes(fstate.entry)) {
            fstate.listOfLettersExists.push({ entity, page: context })
            fstate.maxLetterCounter++
          }
        })
      })

      if (fstate.maxLetterCounter === 0) return

      onSearchGo(fstate.listOfLettersExists[0])
    }

    const onSearchGo = (object: Record<string, any>) => {
      fstate.actuallyLetterRaw = object.letter
      fstate.actuallyLetterCounter =
        fstate.listOfLettersExists.indexOf(object) + 1

      const pageIndex = store.state.project.pages.indexOf(object.page)
      const entityIndex = store.state.project.pages[pageIndex].entity.indexOf(
        object.entity
      )

      onGo(`entity-${entityIndex}`, object.page)
    }

    const onGo = async (go: string | symbol, page: ContextState) => {
      if (store.state.context.id !== page.id) store.commit('context/load', page)
      await nextTick
      useScroll().to(`#${String(go)}`, 'center')
    }

    const onUp = () => {
      if (fstate.actuallyLetterCounter >= fstate.maxLetterCounter) {
        onSearchGo(fstate.listOfLettersExists[0])
      } else {
        const object = fstate.listOfLettersExists[fstate.actuallyLetterCounter]

        onSearchGo(object)
      }
    }

    const onDown = () => {
      if (fstate.actuallyLetterCounter <= 1) {
        onSearchGo(
          fstate.listOfLettersExists[fstate.listOfLettersExists.length - 1]
        )
      } else {
        const object =
          fstate.listOfLettersExists[fstate.actuallyLetterCounter - 2]

        onSearchGo(object)
      }
    }

    return { onFinder, onSearchGo, onGo, onUp, onDown }
  }

  return { utils, swapper, finder, fstate, sstate, sentry }
}
