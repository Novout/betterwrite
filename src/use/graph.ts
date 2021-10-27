import { ContextState } from '@/types/context'
import { nextTick } from 'vue'
import { useScroll } from './scroll'
import { useContextStore } from '@/store/context'
import useEmitter from './emitter'
import { useProject } from './project'

export const useGraph = () => {
  const CONTEXT = useContextStore()

  const emitter = useEmitter()
  const scroll = useScroll()
  const project = useProject()

  const load = async (go: string | symbol, page: ContextState) => {
    project.normalize().then(async () => {
      // load page target
      CONTEXT.load(page)
      await nextTick
      // force scroll to element clicked in aside graph
      scroll.to(String(go))
    })
  }

  return { load }
}
