import { nextTick } from 'vue'
import { useStore } from 'vuex'
import { useEnv } from './env'

export const usePage = () => {
  const store = useStore()
  const env = useEnv()

  const onCreatePage = async () => {
    if (store.state.project.name === env.projectEmpty()) return

    store.commit('project/newPage')
    await nextTick

    const arr = store.state.project.pages
    const obj = arr[arr.length - 1]

    store.commit('context/load', obj)
  }

  const onDeletePage = async () => {
    if (store.state.project.name === env.projectEmpty()) return

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
