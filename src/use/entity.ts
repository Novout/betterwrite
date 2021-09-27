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

  const switcherText = (
    store: Store<any>,
    { entry, output, equal }: Record<any, any>
  ) => {
    const arr = store.state.context.entity

    // TODO: Deletar em caso de output vazio
    if (!entry || !output) return

    arr.forEach((e: ContextStatePageContent) => {
      const text = e.raw.split(' ')

      console.log(text)

      text.forEach((t: string) => {
        if (equal && t === entry) {
          store.commit('context/switchEntityRaw', {
            entity: e,
            match: t,
            raw: output,
          })
        } else if (!equal && t.includes(entry)) {
          store.commit('context/switchEntityRaw', {
            entity: e,
            match: entry,
            raw: output,
          })
        }
      })
    })
  }

  return { entry, switcherText }
}
