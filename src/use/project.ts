import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import { Store } from 'vuex'
import i18n from '@/lang'

export const useProject = (store: Store<any>) => {
  const toast = useToast()
  const { t } = i18n.global

  const onCreateProject = async (project: Record<string, any>) => {
    store.commit('project/create', project)
    await nextTick
    store.commit('context/load', store.state.project.pages[0])

    toast.success(t('toast.project.create'))
  }

  return { onCreateProject }
}
