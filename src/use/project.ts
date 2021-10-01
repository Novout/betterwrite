import { Callback } from '@/types/utils'
import { nextTick } from 'vue'
import { Store } from 'vuex'

export const useProject: Callback<any> = (store: Store<any>) => {
  const onCreateProject = async (project: Record<string, any>) => {
    store.commit('project/create', project)
    await nextTick
    store.commit('context/load', store.state.project.pages[0])
  }

  return { onCreateProject }
}
