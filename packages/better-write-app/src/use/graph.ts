import { nextTick } from 'vue'
import { useScroll } from './scroll'
import { useContextStore } from '@/store/context'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { useAbsoluteStore } from '@/store/absolute'
import { useProjectStore } from '@/store/project'
import { ID, ContextState, Entity } from 'better-write-types'
import { useStorage } from './storage/storage'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { useEditorStore } from '@/store/editor'

export const useGraph = () => {
  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()

  const scroll = useScroll()
  const storage = useStorage()
  const breakpoints = useBreakpoints(breakpointsTailwind)

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
      })
  }

  const to = async (index: ID<number>, page: ContextState, entity: Entity) => {
    await load(index, page, entity)

    utils().mobile()
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
    storage.normalize().then(async () => {
      // get initial page
      const start = PROJECT.pages[0]
      if (!start) return
      // load page target
      CONTEXT.load(start)

      PROJECT.pageLoaded = 0

      utils().mobile()
    })
  }

  return { to, load, normalize, base, utils }
}
