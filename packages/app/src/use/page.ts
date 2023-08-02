import { nextTick } from 'vue'
import { useEnv } from './env'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'
import { ContextState } from 'better-write-types'
import { useScroll } from './scroll'
import { useI18n } from 'vue-i18n'
import useEmitter from './emitter'

export const usePage = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const env = useEnv()
  const scroll = useScroll()
  const { t } = useI18n()
  const emitter = useEmitter()

  const onCreatePage = async () => {
    if (PROJECT.name === env.projectEmpty()) return

    PROJECT.newPage(
      t('editor.project.control.title', {
        suffix: 1 + PROJECT.totalPagesCreated,
      }),
    )

    await nextTick

    const arr = PROJECT.chapters
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
  }

  const onDeletePage = async (page: ContextState) => {
    if (!confirm(t('editor.window.deleteChapterPage'))) return

    if (PROJECT.name === env.projectEmpty()) return

    if (PROJECT.chapters.length <= 1) return

    PROJECT.deletePage(page)

    await nextTick

    CONTEXT.load(PROJECT.chapters[PROJECT.chapters.length - 1])
  }

  const onUpPage = (page: ContextState) => {
    PROJECT.switchPage({
      page,
      direction: 'up',
    })
  }

  const onDownPage = (page: ContextState) => {
    PROJECT.switchPage({
      page,
      direction: 'down',
    })
  }

  const utils = () => {
    const getPageIndex = (id: string): number => {
      const page = PROJECT.chapters.filter(
        (page: ContextState) => id === page.id,
      )[0]

      if (!page) return -1

      return PROJECT.chapters.indexOf(page)
    }

    return { getPageIndex }
  }

  return { utils, onCreatePage, onDeletePage, onUpPage, onDownPage }
}
