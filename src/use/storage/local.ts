import { ProjectObject } from '@/types/project'
import { Callback } from '@/types/utils'
import { Store, useStore } from 'vuex'
import { useEnv } from '../env'

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
    useLocalStorage().setProject({
      project: store.state.project,
      editor: store.state.editor,
    })
  }

  return { set, get, setProject, getProject, onSaveProject }
}
