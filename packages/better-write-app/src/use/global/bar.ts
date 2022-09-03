import { useNProgress } from '@vueuse/integrations/useNProgress'
import { GlobalBarLoadOptions } from 'better-write-types'
import { nextTick } from 'vue'
import { useUtils } from '../utils'

export const useBar = () => {
  const { start, done } = useNProgress()
  const utils = useUtils()

  const load = async (cb: () => any, options?: GlobalBarLoadOptions) => {
    start()

    await nextTick

    await utils.delay(options?.timerInBeforeCallback || 20)
    ;(await cb) && cb()

    if (options?.timerInBeforeCallback) {
      await utils.delay(options?.timerInAfterCallback as number)
    }

    done()
  }

  return { load }
}
