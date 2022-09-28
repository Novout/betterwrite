import { useContextStore } from '@/store/context'
import { useProjectStore } from '@/store/project'
import { ASTUtils } from 'better-write-contenteditable-ast'
import { Entities, Entity, ID, ProjectStateCharacter } from 'better-write-types'
import { useProject } from './project'
import { useUtils } from './utils'
import { useTransformer } from './generator/transformer'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { useStorage } from './storage/storage'
import { useEntity } from './entity'

export const useCharacters = () => {
  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()

  const utils = useUtils()
  const project = useProject()
  const transformer = useTransformer()
  const toast = useToast()
  const { t } = useI18n()
  const storage = useStorage()
  const ent = useEntity()

  const handler = (index?: ID<number>, inner?: string) => {
    const getEntities = (index?: ID<number>): Entities => {
      return index ? [CONTEXT.entities[index]] : CONTEXT.entities
    }

    const entities = getEntities(index)

    const onSetter = (
      entity: Entity,
      str: string,
      c: ProjectStateCharacter
    ) => {
      if (!ent.utils().isTextBlock(entity.type)) return

      const text = ASTUtils.normalize(str, { type: 'all', whitespace: true })

      if (!text) return

      const color = utils.convert().hexToRgbA(c.color, c.colorAlpha)

      const isValidImportant =
        !entity.visual.custom || (entity.visual.custom && c.important)

      const nameCase = transformer.characters().nameCase(c.nameCase, 'setter')

      switch (nameCase) {
        case 'strict':
          if (text.split(' ').find((t) => t === c.name) && isValidImportant)
            entity.visual.custom = color
          break
        case 'default':
          if (
            text
              .split(' ')
              .find((t) => t.toLowerCase().includes(c.name.toLowerCase())) &&
            isValidImportant
          )
            entity.visual.custom = color
          break
        case 'all':
          if (
            text.toLowerCase().includes(c.name.toLowerCase()) &&
            isValidImportant
          )
            entity.visual.custom = color
          break
        default:
          break
      }
    }

    entities.forEach((e, i) => {
      e.visual.custom = undefined

      PROJECT.characters?.list?.forEach((character) => {
        onSetter(e, i === 0 && inner ? inner : e.raw, character)
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

      const paragraphs = PROJECT.pages.reduce(
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
