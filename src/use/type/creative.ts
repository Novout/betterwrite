import { useProjectStore } from '@/store/project'
import { ContextState } from '@/types/context'
import { ProjectTypeID } from '@/types/project'
import { useNProgress } from '@vueuse/integrations'
import useEmitter from '../emitter'
import { useFormat } from '../format'
import { useStorage } from '../storage/storage'
import { useContextStore } from '../../store/context'

export const useCreativeType = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const format = useFormat()
  const emitter = useEmitter()
  const storage = useStorage()
  const { isLoading } = useNProgress()

  const draft = () => {
    const getActivePage = (id: ProjectTypeID) => {
      return PROJECT.pages.filter((page) => page.id === id.active)[0]
    }

    const getDraftPage = (id: ProjectTypeID) => {
      return PROJECT.creative.drafts.filter(
        (page) => PROJECT.creative.drafts.indexOf(page) === id.draft
      )[0]
    }

    const setInfo = (page: ContextState) => {
      emitter.emit('project-creative-drafts-set-info', page)
    }

    const add = (id: ProjectTypeID) => {
      const target = getActivePage(id)

      if (!target) return

      isLoading.value = true

      const page = {
        id: id.active,
        title: `${target.entities[0].raw} | ${format.actually()}`,
        entities: target.entities,
        createdAt: format.actually(),
        updatedAt: format.actually(),
      } as ContextState

      PROJECT.creative.drafts.push(page)

      isLoading.value = false
    }

    const remove = (id: ProjectTypeID) => {
      PROJECT.creative.drafts = PROJECT.creative.drafts.filter(
        (page) => PROJECT.creative.drafts.indexOf(page) !== id.draft
      )

      const target = getActivePage(id)

      setInfo(target)
    }

    const reset = (id: ProjectTypeID) => {
      isLoading.value = true

      const target = getDraftPage(id)

      const pos = PROJECT.creative.drafts.indexOf(target)

      target.entities = [
        {
          type: 'heading-one',
          raw: target.entities[0].raw || 'Untitled',
          createdAt: useFormat().actually(),
          updatedAt: useFormat().actually(),
        },
      ]

      PROJECT.creative.drafts.splice(pos, 1, target)

      setInfo(target)

      isLoading.value = false
    }

    const setActive = (page: ContextState) => {
      const get = PROJECT.pages.filter((p) => p.id === page.id)[0]

      const index = PROJECT.pages.indexOf(get)

      PROJECT.pages.splice(index, 1, page)

      setInfo(page)
    }

    const set = (id: ProjectTypeID) => {
      isLoading.value = true

      const target = getDraftPage(id)
      let actually = getActivePage(id)

      if (!target) return

      setActive(target)

      remove(id)

      PROJECT.creative.drafts.push(actually)

      actually = getActivePage(id)

      setInfo(actually)

      storage
        .normalize()
        .then(() => {
          CONTEXT.load(actually)
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    return { new: add, delete: remove, set, reset }
  }

  return { draft }
}
