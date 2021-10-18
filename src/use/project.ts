import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import { useStore } from 'vuex'
import i18n from '@/lang'

export const useProject = () => {
  const toast = useToast()
  const store = useStore()
  const { t } = i18n.global

  const create = async (project: Record<string, any>) => {
    project.type === 'blank'
      ? store.commit('project/createBlank', project)
      : store.commit('project/create', project)

    await nextTick

    store.commit('context/load', store.state.project.pages[0])

    toast.success(t('toast.project.create'))
  }

  const isBlankProject = () => {
    return store.state.project.type === 'blank'
  }

  const isCreativeProject = () => {
    return store.state.project.type === 'creative'
  }

  return { create, isBlankProject, isCreativeProject }
}
