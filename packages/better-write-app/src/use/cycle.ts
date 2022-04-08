import { useContextStore } from '@/store/context'
import { useProjectStore } from '@/store/project'
import { nextTick } from 'vue'

export const useCycle = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const update = async () => {
    await nextTick

    PROJECT.updateContext(CONTEXT.$state)

    await nextTick
  }

  const awaitedOnMounted = (fn: () => void) => {
    setTimeout(() => fn())
  }

  return { update, awaitedOnMounted }
}
