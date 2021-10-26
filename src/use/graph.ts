import { ContextState } from '@/types/context'
import { nextTick } from 'vue'
import { useScroll } from './scroll'
import { useContextStore } from '@/store/context'
import useEmitter from './emitter'

export const useGraph = () => {
  const CONTEXT = useContextStore()

  const emitter = useEmitter()
  const scroll = useScroll()

  const load = async (go: string | symbol, page: ContextState) => {
    // close open entities contents
    emitter.emit('entity-edit-save')
    // close all entities for not breaking same index in next page
    emitter.emit('entity-edit-reset')
    // TODO: Save entity before called context
    await nextTick
    // load page target
    CONTEXT.load(page)
    await nextTick
    // force scroll to element clicked in aside graph
    scroll.to(String(go))
  }

  return { load }
}
