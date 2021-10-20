import { nextTick } from 'vue'
import { useEnv } from './env'
import { useProjectStore } from '@/store/project'
import { useContextStore } from '@/store/context'

export const usePage = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()

  const env = useEnv()

  const onCreatePage = async () => {
    if (PROJECT.name === env.projectEmpty()) return

    PROJECT.newPage()

    await nextTick

    const arr = PROJECT.pages
    const obj = arr[arr.length - 1]

    CONTEXT.load(obj)
  }

  const onDeletePage = async () => {
    if (PROJECT.name === env.projectEmpty()) return

    if (PROJECT.pages.length <= 1) return

    PROJECT.deletePage(CONTEXT.$state)

    await nextTick

    CONTEXT.load(PROJECT.pages[PROJECT.pages.length - 1])
  }

  return { onCreatePage, onDeletePage }
}
