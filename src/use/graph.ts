import { ContextState } from '@/types/context'
import { nextTick } from 'vue'
import { useScroll } from './scroll'
import { useContextStore } from '@/store/context'

export const useGraph = () => {
  const CONTEXT = useContextStore()
  const scroll = useScroll()

  const load = async (go: string | symbol, page: ContextState) => {
    CONTEXT.load(page)
    await nextTick
    scroll.to(String(go))
  }

  return { load }
}
