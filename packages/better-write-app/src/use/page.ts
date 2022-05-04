import { nextTick } from 'vue'
import { useEnv } from './env'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'
import { ContextState } from 'better-write-types'
import useEmitter from './emitter'
import { useScroll } from './scroll'
import { usePlugin } from 'better-write-plugin-core'
import { useI18n } from 'vue-i18n'

export const usePage = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const env = useEnv()
  const plugin = usePlugin()
  const emitter = useEmitter()
  const scroll = useScroll()
  const { t } = useI18n()

  const onCreatePage = async (title: string) => {
    if (PROJECT.name === env.projectEmpty()) return

    PROJECT.newPage(title)

    await nextTick

    const arr = PROJECT.pages
    const obj = arr[arr.length - 1]

    await nextTick

    CONTEXT.load(obj)

    await nextTick

    scroll.force('#editor-aside')

    plugin.emit('plugin-project-page-new', arr.length - 1)
  }

  const onDeletePage = async () => {
    if (!confirm(t('editor.window.deleteChapterPage'))) return

    if (PROJECT.name === env.projectEmpty()) return

    if (PROJECT.pages.length <= 1) return

    plugin.emit('plugin-project-page-delete', CONTEXT.entities[0].raw)

    PROJECT.deletePage(CONTEXT.$state)

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
