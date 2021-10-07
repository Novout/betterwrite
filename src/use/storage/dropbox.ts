import { Store } from 'vuex'
import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import i18n from '@/lang'

export const useDropbox = (store: Store<any>) => {
  const toast = useToast()
  const { t } = i18n.global

  const onLoadProject = async (context: any) => {
    if (!context) return

    store.commit('project/load', context.project)
    await nextTick

    store.commit('context/load', store.state.project.pages[0])
    await nextTick

    store.commit('logger/load', context.logger.content)
    store.commit('pdf/load', context.pdf)

    toast.success(t('toast.project.load'))
  }

  return { onLoadProject }
}
