import { Callback } from '@/types/utils'
import { ContextStatePageContent } from '@/types/context'
import { Store } from 'vuex'

export const useEntity: Callback<any> = () => {
  const entry = (input: string, target: string): boolean => {
    return (
      input.startsWith('/' + target) ||
      input.startsWith('/' + target.toUpperCase())
    )
  }

  const switcherText = (store: Store<any>, input: string, output: string) => {
    const arr = store.state.context.entity

    arr.forEach((e: ContextStatePageContent) => {
      if (e.raw.includes(input)) {
        store.commit('context/switchEntityRaw', { entity: e, raw: output })
      }
    })
  }

  return { entry, switcherText }
}
