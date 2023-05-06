import { useContextStore } from '@/store/context'
import { useProjectStore } from '@/store/project'
import { ASTUtils } from 'better-write-contenteditable-ast'
import { Entities, ID, ProjectStateCharacter } from 'better-write-types'
import { useProject } from './project'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { useStorage } from './storage/storage'
import { usePlugin } from 'better-write-plugin-core'

export const useCharacters = () => {
  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()

  const project = useProject()
  const toast = useToast()
  const { t } = useI18n()
  const storage = useStorage()
  const plugin = usePlugin()

  const handler = (index?: ID<number>, inner?: string) => {
    const getEntities = (index?: ID<number>): Entities => {
      return index ? [CONTEXT.entities[index]] : CONTEXT.entities
    }

    const entities = getEntities(index)

    entities.forEach((entity, index) => {
      entity.visual.custom = undefined

      PROJECT.characters?.list?.forEach((character) => {
        plugin.emit('plugin-characters-color-background', {
          entity,
          str: index === 0 && inner ? inner : entity.raw,
          character,
        })
      })
    })
  }

  const controller = () => {
    const onDelete = async (character: ProjectStateCharacter) => {
      PROJECT.characters.list = PROJECT.characters.list.filter(
        ({ id }) => id !== character.id
      )

      toast.success(t('toast.generics.successRemoved'))
    }

    return { onDelete }
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
        0
      )

      const result = total / paragraphs

      return isNaN(result) ? '0.0' : result.toFixed(2)
    }

    return { totalOccurrences, averageTotalOccurrences }
  }

  return { handler, controller, data }
}
