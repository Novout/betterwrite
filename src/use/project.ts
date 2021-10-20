import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import i18n from '@/lang'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'

export const useProject = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const toast = useToast()
  const { t } = i18n.global

  const create = async (project: Record<string, any>) => {
    project.type === 'blank'
      ? PROJECT.createBlank(project)
      : PROJECT.create(project)

    await nextTick

    CONTEXT.load(PROJECT.pages[0])

    toast.success(t('toast.project.create'))
  }

  const isBlankProject = () => {
    return PROJECT.type === 'blank'
  }

  const isCreativeProject = () => {
    return PROJECT.type === 'creative'
  }

  return { create, isBlankProject, isCreativeProject }
}
