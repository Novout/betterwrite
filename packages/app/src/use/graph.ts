import { nextTick } from 'vue'
import { useScroll } from './scroll'
import { restoreEditorScroll } from './chapter-scroll'
import { useContextStore } from '@/store/context'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { useAbsoluteStore } from '@/store/absolute'
import { useProjectStore } from '@/store/project'
import { ID, ContextState, Entity } from 'better-write-types'
import { useStorage } from './storage/storage'
import { useEditorStore } from '@/store/editor'
import { useCycle } from './cycle'
import { useCharacters } from './characters'

export const useGraph = () => {
  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()

  const scroll = useScroll()
  const storage = useStorage()
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const cycle = useCycle()
  const characters = useCharacters()

  const utils = () => {
    const mobile = () => {
      if (breakpoints.smaller('md').value) ABSOLUTE.aside = false
    }

    return { mobile }
  }

  const load = async (
    index: ID<number>,
    page: ContextState,
    entity: Entity,
    scrollValue?: number,
  ) => {
    // the chapter scroll can only be recorded while a chapter is on screen
    // (coming from annotations, #entity-main shows the annotations view)
    const fromChapter = PROJECT.base === 'chapter'

    // clicking the title of another chapter opens it where the user left it;
    // sub-items (headings, comments...) and the current chapter title jump
    // to the clicked entity as before
    const resume =
      scrollValue === undefined && index === 0 && CONTEXT.id !== page.id

    storage
      .normalize()
      .then(async () => {
        // load page target
        CONTEXT.load(page, {
          restoreScroll: resume,
          rememberScroll: fromChapter,
        })

        PROJECT.base = 'chapter'

        PROJECT.pageLoaded = page.id

        await nextTick

        if (resume) return

        if (scrollValue !== undefined) {
          // waits for the chapter entities to render before scrolling
          restoreEditorScroll(scrollValue)

          return
        }

        // force scroll to element clicked in aside graph
        scroll.entity(index)
      })
      .finally(() => {
        // open comment modal with comment click
        if (entity.external?.comment?.raw) {
          EDITOR.actives.entity.index = index

          ABSOLUTE.entity.comment = true
        }

        characters.handler()
      })
  }

  const to = async (
    index: ID<number>,
    page: ContextState,
    entity: Entity,
    scrollValue?: number,
  ) => {
    ABSOLUTE.spinner = true

    await cycle.forceNextTick()

    await load(index, page, entity, scrollValue)

    utils().mobile()

    ABSOLUTE.spinner = false
  }

  const normalize = () => {
    const id = (page: ContextState, ind: ID) => {
      return `graph-${page.id}-${String(ind)}`
    }

    const key = (page: ContextState, ind: ID) => {
      return `graph-${page.id}-${String(ind)}`
    }

    return { id, key }
  }

  const base = () => {
    PROJECT.base = 'chapter'
  }

  return { to, load, normalize, base, utils }
}
