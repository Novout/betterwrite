import { useStore } from 'vuex'
import { ContextState } from '@/types/context'
import { nextTick } from 'vue'
import { useScroll } from './scroll'

export const useGraph = () => {
  const store = useStore()
  const scroll = useScroll()

  const load = async (go: string | symbol, page: ContextState) => {
    store.commit('context/load', page)
    await nextTick
    scroll.to(String(go))
  }

  return { load }
}
