import { ProjectObject } from '@/types/project'
import { Callback } from '@/types/utils'
import { Store } from 'vuex'
import { useEnv } from '../env'
import { nextTick } from 'vue'

export const useLocalStorage: Callback<any> = (store: Store<any>) => {
  const set = (obj: ProjectObject, name: string) => {
    localStorage.setItem(useEnv().projectLocalStorage(), JSON.stringify(obj))
  }

  const get = (name: string) => {
    return JSON.parse((localStorage as any).getItem(name))
  }

  const setProject = (obj: ProjectObject) => {
    set(obj, useEnv().projectLocalStorage())
  }

  const getProject = (): ProjectObject => {
    return get(useEnv().projectLocalStorage())
  }

  const onSaveProject = () => {
    if (store.state.project.name === useEnv().projectEmpty()) return

    useLocalStorage().setProject({
      project: store.state.project,
      editor: store.state.editor,
    })
  }

  const onLoadProject = async () => {
    const context = useLocalStorage().getProject()

    if (!context) return

    store.commit('project/load', context.project)
    await nextTick

    store.commit('context/load', store.state.project.pages[0])
  }

  return { set, get, setProject, getProject, onSaveProject, onLoadProject }
}
