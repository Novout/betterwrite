import { Store } from 'vuex'
import { nextTick } from 'vue'
import { ProjectState } from '../../types/project'

export const useDropbox = (store: Store<any>) => {
  const onLoadProject = async (context: any) => {
    if (!context) return

    store.commit('project/load', context.project)
    await nextTick

    store.commit('context/load', store.state.project.pages[0])
    await nextTick

    store.commit('logger/load', context.logger.content)
    store.commit('pdf/load', context.pdf)
  }

  return { onLoadProject }
}
