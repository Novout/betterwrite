import { nextTick } from 'vue'
import { useEnv } from './env'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'
import { ContextState } from 'better-write-types'
import { useScroll } from './scroll'
import { useI18n } from 'vue-i18n'
import useEmitter from './emitter'
import { useBar } from './global/bar'

export const usePage = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const env = useEnv()
  const bar = useBar()
  const scroll = useScroll()
  const { t } = useI18n()
  const emitter = useEmitter()

  const onCreatePage = async (title: string) => {
    if (PROJECT.name === env.projectEmpty()) return

    bar.load(async () => {
      PROJECT.newPage(title)

      await nextTick

      const arr = PROJECT.pages
      const obj = arr[arr.length - 1]

      await nextTick

      CONTEXT.load(obj)

      await nextTick

      scroll.force('#editor-aside')

      await nextTick

      emitter.emit('entity-text-focus', {
        target: 1,
        position: 'start',
      })
    })
  }

  const onDeletePage = async (page: ContextState) => {
    if (!confirm(t('editor.window.deleteChapterPage'))) return

    if (PROJECT.name === env.projectEmpty()) return

    if (PROJECT.pages.length <= 1) return

    bar.load(async () => {
      PROJECT.deletePage(page)

      await nextTick

      CONTEXT.load(PROJECT.pages[PROJECT.pages.length - 1])
    })
  }

  const onUpPage = (page: ContextState) => {
    bar.load(() => {
      PROJECT.switchPage({
        page,
        direction: 'up',
      })
    })
  }

  const onDownPage = (page: ContextState) => {
    bar.load(() => {
      PROJECT.switchPage({
        page,
        direction: 'down',
      })
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
