import { ContextState } from '@/types/context'
import { nextTick } from 'vue'
import { useScroll } from './scroll'
import { useContextStore } from '@/store/context'
import { useProject } from './project'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { useAbsoluteStore } from '@/store/absolute'
import { useProjectStore } from '@/store/project'

export const useGraph = () => {
  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()
  const PROJECT = useProjectStore()

  const scroll = useScroll()
  const project = useProject()
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const utils = () => {
    const mobile = () => {
      if (breakpoints.smaller('md').value) ABSOLUTE.aside = false
    }

    return { mobile }
  }

  const load = async (go: string | number | symbol, page: ContextState) => {
    project.normalize().then(async () => {
      // load page target
      CONTEXT.load(page)
      await nextTick
      // force scroll to element clicked in aside graph
      scroll.to(String(go))
    })
  }

  const to = (ind: string | number | symbol, page: ContextState) => {
    load(`#entity-${String(ind)}`, page)

    utils().mobile()
  }

  const normalize = () => {
    const id = (page: ContextState, ind: string | number | symbol) => {
      return `graph-${page.id}-${String(ind)}`
    }

    const key = (page: ContextState, ind: string | number | symbol) => {
      return `graph-${page.id}-${String(ind)}`
    }

    return { id, key }
  }

  const base = () => {
    project.normalize().then(async () => {
      // get initial page
      const start = PROJECT.pages[0]
      if (!start) return
      // load page target
      CONTEXT.load(start)
      
      utils().mobile()
    })
  }

  return { to, load, normalize, base, utils }
}
