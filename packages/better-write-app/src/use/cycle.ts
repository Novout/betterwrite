import { useContextStore } from '@/store/context'
import { useProjectStore } from '@/store/project'
import { nextTick } from 'vue'
import { useUtils } from './utils'

export const useCycle = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const utils = useUtils()

  const update = async () => {
    await nextTick

    PROJECT.updateContext(CONTEXT.$state)

    await nextTick
  }

  const forceNextTick = async () => {
    await nextTick

    await utils.delay(20)

    await nextTick
  }

  const awaitedOnMounted = (fn: () => void) => {
    setTimeout(() => fn())
  }

  return { update, forceNextTick, awaitedOnMounted }
}
