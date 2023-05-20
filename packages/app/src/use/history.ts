import { useHistoryStore } from '@/store/history'
import { usePlugin } from 'better-write-plugin-core'
import { useSchemas } from '@/use/schemas'
import { HistoryStateBarItem } from 'better-write-types'
import { useGraph } from '@/use/graph'
import { useProjectStore } from '@/store/project'
import { useStorage } from '@/use/storage/storage'

export const useHistory = () => {
  const HISTORY = useHistoryStore()
  const PROJECT = useProjectStore()

  const plugin = usePlugin()
  const schemas = useSchemas()
  const graph = useGraph()
  const storage = useStorage()

  const onLoad = async (item?: HistoryStateBarItem) => {
    await storage.normalize()

    if (!item) item = HISTORY.bar.shift()

    if (!item) return

    if (item.type === 'annotations') {
      const target = schemas.findFile(item.id)

      if (!target) {
        HISTORY.deleteBar(item)

        return
      }

      HISTORY.updateScroll()
      plugin.emit('plugin-schemas-start', { target, item })
      HISTORY.barActive = item.id

      return
    }

    const page = PROJECT.chapters.find((chapter) => chapter.id === item?.id)

    if (!page) {
      HISTORY.deleteBar(item)

      return
    }

    HISTORY.updateScroll()
    await graph.to(item.id as number, page, page.entities[0], item.scrollHeight)
  }

  const onDeleteBar = (item: HistoryStateBarItem) => {
    HISTORY.deleteBar(item)

    onLoad()
  }

  const onCloseAll = () => {
    HISTORY.bar = []
    HISTORY.barActive = undefined
  }

  return { onDeleteBar, onCloseAll, onLoad }
}
