import { nextTick } from 'vue'
import { useEnv } from './env'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'
import usePlugin from './plugin/core'
import { ContextState } from '@/types/context'
import useEmitter from './emitter'
import { useScroll } from './scroll'

export const usePage = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const env = useEnv()
  const plugin = usePlugin()
  const emitter = useEmitter()
  const scroll = useScroll()

  const onCreatePage = async () => {
    if (PROJECT.name === env.projectEmpty()) return

    PROJECT.newPage()

    await nextTick

    const arr = PROJECT.pages
    const obj = arr[arr.length - 1]

    emitter.emit('entity-not-mutate')

    await nextTick

    CONTEXT.load(obj)

    await nextTick

    scroll.force('#editor-aside')

    plugin.emit('plugin-project-page-new', arr.length - 1)
  }

  const onDeletePage = async () => {
    if (PROJECT.name === env.projectEmpty()) return

    if (PROJECT.pages.length <= 1) return

    plugin.emit(
      'plugin-project-page-delete',
      utils().getPageIndex(CONTEXT.$state.id)
    )

    PROJECT.deletePage(CONTEXT.$state)

    await nextTick

    emitter.emit('entity-not-mutate')

    await nextTick

    CONTEXT.load(PROJECT.pages[PROJECT.pages.length - 1])
  }

  const onUpPage = (e: MouseEvent) => {
    plugin.emit('plugin-project-page-swap', {
      index: utils().getPageIndex(CONTEXT.$state.id),
      direction: 'up',
    })

    PROJECT.switchPage({
      page: CONTEXT.$state,
      direction: 'up',
    })
  }

  const onDownPage = (e: MouseEvent) => {
    plugin.emit('plugin-project-page-swap', {
      index: utils().getPageIndex(CONTEXT.$state.id),
      direction: 'down',
    })

    PROJECT.switchPage({
      page: CONTEXT.$state,
      direction: 'down',
    })
  }

  const utils = () => {
    const getPageIndex = (id: number): number => {
      const page = PROJECT.pages.filter(
        (page: ContextState) => id === page.id
      )[0]

      if (!page) return -1

      return PROJECT.pages.indexOf(page)
    }

    return { getPageIndex }
  }

  return { utils, onCreatePage, onDeletePage, onUpPage, onDownPage }
}
