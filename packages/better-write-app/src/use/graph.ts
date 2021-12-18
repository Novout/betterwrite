import { ContextState } from '@/types/context'
import { nextTick } from 'vue'
import { useScroll } from './scroll'
import { useContextStore } from '@/store/context'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { useAbsoluteStore } from '@/store/absolute'
import { useProjectStore } from '@/store/project'
import { ID } from '../types/utils'
import { useStorage } from './storage/storage'
import { useNProgress } from '@vueuse/integrations'

export const useGraph = () => {
  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const scroll = useScroll()
  const storage = useStorage()
  const { isLoading } = useNProgress()
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const utils = () => {
    const mobile = () => {
      if (breakpoints.smaller('md').value) ABSOLUTE.aside = false
    }

    return { mobile }
  }

  const load = async (go: ID, page: ContextState) => {
    isLoading.value = true
    storage
      .normalize()
      .then(async () => {
        // load page target
        CONTEXT.load(page)

        PROJECT.pageLoaded = page.id
        await nextTick
        // force scroll to element clicked in aside graph
        scroll.to(String(go))
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const to = (ind: ID, page: ContextState) => {
    load(`#entity-${String(ind)}`, page)

    PROJECT.pageLoaded = page.id

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
