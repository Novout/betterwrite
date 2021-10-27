import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import i18n from '@/lang'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'
import useEmitter from './emitter'

export const useProject = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const toast = useToast()
  const emitter = useEmitter()
  const { t } = i18n.global

  const create = (project: Record<string, any>) => {
    normalize().then(async () => {
      project.type === 'blank'
        ? PROJECT.createBlank(project)
        : PROJECT.create(project)

      await nextTick

      CONTEXT.load(PROJECT.pages[0])

      toast.success(t('toast.project.create'))
    })
  }

  const isBlankProject = () => {
    return PROJECT.type === 'blank'
  }

  const isCreativeProject = () => {
    return PROJECT.type === 'creative'
  }

  const normalize = async () => {
    // close open entities contents
    emitter.emit('entity-edit-save')
    // force last input in emit content
    emitter.emit('entity-input-force-enter')

    await nextTick
    // close all entities for not breaking same index in next page
    emitter.emit('entity-edit-reset')

    await nextTick
  }

  return { create, isBlankProject, isCreativeProject, normalize }
}
