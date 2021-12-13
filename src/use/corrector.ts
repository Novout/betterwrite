import { useAddonsStore } from '@/store/addons'
import { useContextStore } from '@/store/context'
import { useProjectStore } from '@/store/project'
import { useStorage } from './storage/storage'
import { nextTick } from 'vue'
import { useNProgress } from '@vueuse/integrations'
import { useProject } from './project'
import { Entity } from '@/types/context'
import { useEditorStore } from '../store/editor'

export const useCorrector = () => {
  const PROJECT = useProjectStore()
  const EDITOR = useEditorStore()
  const CONTEXT = useContextStore()
  const ADDONS = useAddonsStore()

  const storage = useStorage()
  const project = useProject()
  const { isLoading } = useNProgress()

  const getAllEntities = (cb: (...a: any) => void) => {
    PROJECT.pages.forEach((page) => {
      page.entities.forEach((entity) => {
        if (project.utils().isValidType(entity)) cb && cb(entity)
      })
    })

    isLoading.value = false
  }

  const getParagraphEntities = (cb: (...a: any) => void) => {
    PROJECT.pages.forEach((page) => {
      page.entities.forEach((entity) => {
        if (project.utils().isValidType(entity) && entity.type === 'paragraph')
          cb && cb(entity)
      })
    })

    isLoading.value = false
  }

  const options = () => {
    const removeStartWhitespace = () => {
      if (ADDONS.corrector.options[0].option) {
        getParagraphEntities((entity: Entity) => {
          entity.raw = entity.raw.trimStart()
        })
      }
    }

    const removeEndWhitespace = () => {
      if (ADDONS.corrector.options[1].option) {
        getParagraphEntities((entity: Entity) => {
          entity.raw = entity.raw.trimEnd()
        })
      }
    }

    const insertParagraphEndStop = () => {
      if (ADDONS.corrector.options[2].option) {
        getParagraphEntities((entity: Entity) => {
          const last = entity.raw.charAt(entity.raw.length - 1)

          if (last !== '.' && last !== ':' && last !== '/') entity.raw += '.'
        })
      }
    }

    const removeExtraWhitespace = () => {
      if (ADDONS.corrector.options[3].option) {
        getAllEntities((entity: Entity) => {
          entity.raw = entity.raw.replace(/\s+/g, ' ').trim()
        })
      }
    }

    const insertDialogEndStop = () => {
      if (ADDONS.corrector.options[4].option) {
        getParagraphEntities((entity: Entity) => {
          let counter = 0
          for (let i = 0; i < entity.raw.length; i++) {
            const letter = entity.raw.charAt(i)

            if (
              letter === EDITOR.configuration.commands.dialogue.value.charAt(0)
            ) {
              counter++
            }

            if (counter === 2) {
              entity.raw =
                entity.raw.slice(0, i - 1) + '.' + entity.raw.slice(i - 1)
              break
            }
          }
        })
      }
    }

    return {
      getAllEntities,
      getParagraphEntities,
      removeStartWhitespace,
      removeEndWhitespace,
      insertParagraphEndStop,
      removeExtraWhitespace,
      insertDialogEndStop,
    }
  }

  const apply = () => {
    isLoading.value = true

    storage.normalize().then(async () => {
      PROJECT.updateContext(CONTEXT.$state)

      await nextTick

      await options().removeStartWhitespace()
      await options().removeEndWhitespace()
      await options().insertParagraphEndStop()
      await options().removeExtraWhitespace()
      await options().insertDialogEndStop()

      CONTEXT.load(PROJECT.pages[0])
    })
  }

  return { options, apply }
}
