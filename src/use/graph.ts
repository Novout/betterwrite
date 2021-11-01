import { ContextState } from '@/types/context'
import { nextTick } from 'vue'
import { useScroll } from './scroll'
import { useContextStore } from '@/store/context'
import useEmitter from './emitter'
import { useProject } from './project'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { useAbsoluteStore } from '@/store/absolute'

export const useGraph = () => {
  const CONTEXT = useContextStore()
  const ABSOLUTE = useAbsoluteStore()

  const emitter = useEmitter()
  const scroll = useScroll()
  const project = useProject()
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const load = async (go: string | symbol, page: ContextState) => {
    project.normalize().then(async () => {
      // load page target
      CONTEXT.load(page)
      await nextTick
      // force scroll to element clicked in aside graph
      scroll.to(String(go))
    })
  }

  const to = (ind: number | symbol, page: ContextState) => {
    load(`#entity-${String(ind)}`, page)

    if (breakpoints.smaller('md').value) ABSOLUTE.aside = false
  }

  const normalize = () => {
    const id = (page: ContextState, ind: number | symbol) => {
      return `graph-${page.id}-${String(ind)}`
    }

    const key = (page: ContextState, ind: number | symbol) => {
      return `graph-${page.id}-${String(ind)}`
    }

    return { id, key }
  }

  return { to, load, normalize }
}
