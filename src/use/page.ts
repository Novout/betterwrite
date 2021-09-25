import { Callback } from '@/types/utils'
import { nextTick } from 'vue'
import { useStore } from 'vuex'

export const usePage: Callback<any> = () => {
  const store = useStore()

  const onCreatePage = async () => {
    store.commit('project/newPage')
    await nextTick

    const arr = store.state.project.pages
    const obj = arr[arr.length - 1]

    store.commit('context/load', obj)
  }

  const onDeletePage = async () => {
    if (store.state.project.pages.length <= 1) return

    store.commit('project/deletePage', store.state.context)
    await nextTick

    store.commit('context/load', store.state.project.pages[store.state.project.pages.length - 1])
  }

  return { onCreatePage, onDeletePage }
}
