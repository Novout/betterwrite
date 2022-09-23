import { useContextStore } from '@/store/context'
import { useProjectStore } from '@/store/project'
import { ASTUtils } from 'better-write-contenteditable-ast'
import { Entities, Entity, ID, ProjectStateCharacter } from 'better-write-types'
import { useProject } from './project'
import { useUtils } from './utils'

export const useCharacters = () => {
  const CONTEXT = useContextStore()
  const PROJECT = useProjectStore()

  const utils = useUtils()
  const project = useProject()

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
      const text = utils.text().defaultWhitespace(str)
      const color = utils.convert().hexToRgbA(c.color, c.colorAlpha)

      switch (c.nameCase) {
        case 'strict':
          if (text.split(' ').find((t) => t === c.name))
            entity.visual.custom = color
          break
        case 'default':
          if (
            text
              .split(' ')
              .find((t) => t.toLowerCase().includes(c.name.toLowerCase()))
          )
            entity.visual.custom = color
          break
        case 'all':
          if (text.toLowerCase().includes(c.name.toLowerCase()))
            entity.visual.custom = color
          break
        default:
          break
      }

      if (!text.toLowerCase().includes(c.name.toLowerCase()))
        entity.visual.custom = undefined
    }

    entities.forEach((e) => {
      PROJECT.characters?.list?.forEach(async (character, i) => {
        await onSetter(e, i === 0 && inner ? inner : e.raw, character)
      })
    })
  }

  const controller = () => {
    const onDelete = async (character: ProjectStateCharacter) => {
      PROJECT.characters.list = PROJECT.characters.list.filter(
        ({ id }) => id !== character.id
      )
    }

    return { onDelete }
  }

  const data = () => {
    const totalOccurrences = (name: string): number => {
      let v = 0

      project.utils().getParagraphEntities((entity) => {
        v += ASTUtils.occurrences(entity.raw, name, false)
      })

      return v
    }

    const averageTotalOccurrences = (name: string): string => {
      const total = totalOccurrences(name)

      const paragraphs = PROJECT.pages.reduce(
        (sum, val) => sum + project.utils().getChapterParagraphs(val),
        0
      )

      return (total / paragraphs).toFixed(2)
    }

    return { totalOccurrences, averageTotalOccurrences }
  }

  return { handler, controller, data }
}
