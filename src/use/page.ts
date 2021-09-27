import { Callback } from '@/types/utils'
import { nextTick } from 'vue'
import { Store } from 'vuex'
import { useEnv } from './env'

export const usePage: Callback<any> = (store: Store<any>) => {
  const onCreatePage = async () => {
    if (store.state.project.name === useEnv().projectEmpty()) return

    store.commit('project/newPage')
    await nextTick

    const arr = store.state.project.pages
    const obj = arr[arr.length - 1]

    store.commit('context/load', obj)
  }

  const onDeletePage = async () => {
    if (store.state.project.name === useEnv().projectEmpty()) return

    if (store.state.project.pages.length <= 1) return

    store.commit('project/deletePage', store.state.context)
    await nextTick

    store.commit(
      'context/load',
      store.state.project.pages[store.state.project.pages.length - 1]
    )
  }

  return { onCreatePage, onDeletePage }
}
