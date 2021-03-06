import { useProjectStore } from '@/store/project'
import { ProjectTypeID, ContextState } from 'better-write-types'
import useEmitter from '../emitter'
import { useFormat } from '../format'
import { useStorage } from '../storage/storage'
import { useContextStore } from '@/store/context'
import { nextTick } from 'vue'
import { usePlugin } from 'better-write-plugin-core'
import { useFactory } from '../factory'

export const useCreativeType = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const format = useFormat()
  const emitter = useEmitter()
  const plugin = usePlugin()
  const storage = useStorage()
  const factory = useFactory()

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

      const title = `${target.entities[0].raw} | ${format.actually()}`

      const exists = PROJECT.creative.drafts.filter(
        (page) => page.title === title
      )[0]

      if (exists) return

      const page = {
        id: id.active,
        title,
        entities: target.entities,
        createdAt: format.actually(),
        updatedAt: format.actually(),
      } as ContextState

      PROJECT.creative.drafts.push(page)

      plugin.emit('plugin-project-creative-drafts-create-draft', page)
    }

    const remove = async (id: ProjectTypeID) => {
      const set = getDraftPage(id)

      PROJECT.creative.drafts = PROJECT.creative.drafts.filter(
        (page) => PROJECT.creative.drafts.indexOf(page) !== id.draft
      )

      const target = getActivePage(id)

      setInfo(target)

      await nextTick

      plugin.emit('plugin-project-creative-drafts-delete-draft', set)
    }

    const reset = (id: ProjectTypeID) => {
      const target = getDraftPage(id)

      const pos = PROJECT.creative.drafts.indexOf(target)

      target.entities = [
        factory
          .entity()
          .create('heading-one', target.entities[0].raw || 'Untitled'),
      ]

      PROJECT.creative.drafts.splice(pos, 1, target)

      setInfo(target)

      plugin.emit('plugin-project-creative-drafts-reset-draft', target)
    }

    const setActive = (page: ContextState) => {
      const get = PROJECT.pages.filter((p) => p.id === page.id)[0]

      const index = PROJECT.pages.indexOf(get)

      PROJECT.pages.splice(index, 1, page)

      setInfo(page)
    }

    const set = (id: ProjectTypeID) => {
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
        .finally(() => {})

      plugin.emit('plugin-project-creative-drafts-set-draft', actually)
    }

    const updateTitle = (id: ProjectTypeID, main: boolean, title: string) => {
      if (main) {
        const target = getActivePage(id)

        const index = PROJECT.pages.indexOf(target)

        PROJECT.pages[index].title = title
        PROJECT.pages[index].updatedAt = format.actually()

        return
      }

      const target = getDraftPage(id)

      const index = PROJECT.creative.drafts.indexOf(target)

      PROJECT.creative.drafts[index].title = title
      PROJECT.creative.drafts[index].updatedAt = format.actually()
    }

    return { new: add, delete: remove, set, reset, updateTitle }
  }

  return { draft }
}
