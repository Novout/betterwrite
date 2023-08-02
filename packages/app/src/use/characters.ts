import { useContextStore } from '@/store/context'
import { useProjectStore } from '@/store/project'
import { ASTUtils } from 'better-write-contenteditable-ast'
import { Entities, ID } from 'better-write-types'
import { useProject } from './project'
import { useStorage } from './storage/storage'
import { usePlugin } from 'better-write-plugin-core'

export const useCharacters = () => {
  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()

  const project = useProject()
  const storage = useStorage()
  const plugin = usePlugin()

  const handler = (index?: ID<number>, inner?: string) => {
    const getEntities = (index?: ID<number>): Entities => {
      return index ? [CONTEXT.entities[index]] : CONTEXT.entities
    }

    const entities = getEntities(index)

    entities.forEach((entity, index) => {
      entity.visual.custom = undefined

      PROJECT.schemas.forEach((schema) => {
        schema.folders.forEach((folder) => {
          folder.files.forEach((file) => {
            plugin.emit('plugin-characters-color-background', {
              entity,
              str: index === 0 && inner ? inner : entity.raw,
              character: file.extra,
            })
          })
        })
      })
    })
  }

  const data = () => {
    const totalOccurrences = async (name: string) => {
      await storage.normalize()

      let v = 0

      project.utils().getParagraphEntities((entity) => {
        v += ASTUtils.occurrences(entity.raw, name, false)
      })

      return v
    }

    const averageTotalOccurrences = async (name: string): Promise<string> => {
      const total = await totalOccurrences(name)

      const paragraphs = PROJECT.chapters.reduce(
        (sum, val) => sum + project.utils().getChapterParagraphs(val),
        0,
      )

      const result = total / paragraphs

      return isNaN(result) ? '0.0' : result.toFixed(2)
    }

    return { totalOccurrences, averageTotalOccurrences }
  }

  return { handler, data }
}
