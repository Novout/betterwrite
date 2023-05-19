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
import { useHistoryStore } from '@/store/history'
import { useFormat } from './format'

export const useGraph = () => {
  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const HISTORY = useHistoryStore()

  const scroll = useScroll()
  const storage = useStorage()
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const cycle = useCycle()
  const format = useFormat()
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
    entity: Entity
  ) => {
    PROJECT.base = 'chapter'

    storage
      .normalize()
      .then(async () => {
        // load page target
        CONTEXT.load(page)

        PROJECT.pageLoaded = page.id
        await nextTick
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

  const to = async (index: ID<number>, page: ContextState, entity: Entity) => {
    ABSOLUTE.spinner = true

    await cycle.forceNextTick()

    await load(index, page, entity)

    utils().mobile()

    ABSOLUTE.spinner = false

    console.log(index)

    HISTORY.addBar({
      id: page.id,
      name: page.entities ? page.entities[0].raw : page.title,
      type: 'chapter',
      scrollHeight: 0,
      createdAt: format.actually('iso'),
    })
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
