import { nextTick } from 'vue'
import { useScroll } from './scroll'
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
    PROJECT.base = 'chapter'

    storage
      .normalize()
      .then(async () => {
        // load page target
        CONTEXT.load(page)

        PROJECT.pageLoaded = page.id

        await nextTick

        if (scrollValue !== undefined) {
          let el = document.querySelector('#entity-main')

          if (!el) el = document.querySelector('#bw-wysiwyg')

          if (el) el.scrollTop = scrollValue

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
