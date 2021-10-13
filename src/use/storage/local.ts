import { ProjectObject } from '@/types/project'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { nextTick } from 'vue'
import { useEnv } from '../env'
import i18n from '@/lang'

export const useLocalStorage = () => {
  const store = useStore()
  const toast = useToast()
  const { t } = i18n.global

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

    setProject({
      project: store.state.project,
      editor: store.state.editor,
      logger: store.state.logger,
      pdf: {
        styles: store.state.pdf.styles,
        fonts: [],
        normalize: {},
      },
    })

    toast.success(t('toast.project.save'))
  }

  const onAutoSave = (time: number) => {
    setInterval(() => {
      if (store.state.project.name === useEnv().projectEmpty()) return

      setProject({
        project: store.state.project,
        editor: store.state.editor,
        logger: store.state.logger,
        pdf: {
          styles: store.state.pdf.styles,
          fonts: [],
          normalize: {},
        },
      })
    }, parseInt(`${time}000`))
  }

  const onLoadProject = async () => {
    const context = getProject()

    if (!context) return

    store.commit('project/load', context.project)
    await nextTick

    store.commit('context/load', store.state.project.pages[0])
    await nextTick

    store.commit('logger/load', context.logger.content)
    store.commit('pdf/load', context.pdf)

    toast.success(t('toast.project.load'))
  }

  return {
    set,
    get,
    setProject,
    getProject,
    onSaveProject,
    onLoadProject,
    onAutoSave,
  }
}
