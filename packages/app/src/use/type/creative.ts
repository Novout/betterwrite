import { useProjectStore } from '@/store/project'
import { ContextState } from 'better-write-types'
import { useFormat } from '../format'
import { useStorage } from '../storage/storage'
import { useContextStore } from '@/store/context'
import { useFactory } from '../factory'
import { nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

export const useCreativeType = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const format = useFormat()
  const storage = useStorage()
  const factory = useFactory()
  const toast = useToast()
  const { t } = useI18n()

  const draft = () => {
    const get = (page: ContextState) => {
      return PROJECT.creative.drafts.find((p) => page === p) as ContextState
    }

    const add = () => {
      const pageActive = CONTEXT.$state

      const title = `${CONTEXT.$state.title} | ${format.actually()}`

      if (PROJECT.creative.drafts.find((i) => i.title === title)) return

      PROJECT.creative.drafts.unshift({
        id: CONTEXT.$state.id,
        title,
        entities: pageActive.entities,
        createdAt: format.actually(),
        updatedAt: format.actually(),
      })

      toast.success(t('toast.generics.successAdded'))
    }

    const remove = (page: ContextState) => {
      PROJECT.creative.drafts = PROJECT.creative.drafts.filter(
        (p) => p !== page
      )

      toast.success(t('toast.generics.successRemoved'))
    }

    const reset = (page: ContextState) => {
      const pos = PROJECT.creative.drafts.indexOf(page)

      page.entities = [
        factory
          .entity()
          .create('heading-one', page.entities[0].raw || 'Untitled'),
      ]

      PROJECT.creative.drafts.splice(pos, 1, page)

      toast.success(t('toast.generics.successRestarted'))
    }

    const set = async (page: ContextState) => {
      await storage.normalize()

      const old = CONTEXT.$state

      remove(page)

      PROJECT.creative.drafts.unshift({
        ...old,
      })

      await nextTick

      PROJECT.chapters = PROJECT.chapters.map((p) => {
        if (p.id === page.id) return page

        return p
      })

      await nextTick

      CONTEXT.load(page)

      toast.success(t('toast.generics.successSet'))
    }

    const updateTitle = (page: ContextState, main: boolean, title: string) => {
      if (main) {
        CONTEXT.$state.title = title
        CONTEXT.$state.updatedAt = format.actually()

        toast.success(t('toast.generics.successUpdated'))

        return
      }

      const target = get(page)

      const index = PROJECT.creative.drafts.indexOf(target)

      PROJECT.creative.drafts[index].title = title
      PROJECT.creative.drafts[index].updatedAt = format.actually()

      toast.success(t('toast.generics.successUpdated'))
    }

    return { new: add, delete: remove, set, reset, updateTitle }
  }

  return { draft }
}
