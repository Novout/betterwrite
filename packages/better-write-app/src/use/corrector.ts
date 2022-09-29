import { useAddonsStore } from '@/store/addons'
import { useContextStore } from '@/store/context'
import { useStorage } from './storage/storage'
import { nextTick } from 'vue'
import { useProject } from './project'
import { Entity } from 'better-write-types'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { ASTUtils } from 'better-write-contenteditable-ast'

export const useCorrector = () => {
  const CONTEXT = useContextStore()
  const ADDONS = useAddonsStore()

  const storage = useStorage()
  const project = useProject()
  const toast = useToast()
  const { t } = useI18n()

  const options = () => {
    const removeStartWhitespace = () => {
      if (ADDONS.corrector.options[0].option) {
        project.utils().getParagraphEntities((entity: Entity) => {
          entity.raw = entity.raw.trimStart()
        })
      }
    }

    const removeEndWhitespace = () => {
      if (ADDONS.corrector.options[1].option) {
        project.utils().getParagraphEntities((entity: Entity) => {
          entity.raw = entity.raw.trimEnd()
        })
      }
    }

    const insertParagraphEndStop = () => {
      if (ADDONS.corrector.options[2].option) {
        project.utils().getParagraphEntities((entity: Entity) => {
          const last = entity.raw.charAt(entity.raw.length - 1)

          if (!last?.match(/^[.,;:`"'!?]/) && last && last !== ' ')
            entity.raw += '.'
        })
      }
    }

    const removeExtraWhitespace = () => {
      if (ADDONS.corrector.options[3].option) {
        project.utils().getAllEntities((entity: Entity) => {
          entity.raw = entity.raw.replace(/\s+/g, ' ').trim()
        })
      }
    }

    const resetEntityRaw = () => {
      if (ADDONS.corrector.options[4].option) {
        project.utils().getParagraphEntities((entity: Entity) => {
          entity.raw =
            ASTUtils.normalize(entity.raw, { type: 'inserts' }) || ' '
        })
      }
    }

    return {
      removeStartWhitespace,
      removeEndWhitespace,
      insertParagraphEndStop,
      removeExtraWhitespace,
      resetEntityRaw,
    }
  }

  const apply = () => {
    storage
      .normalize()
      .then(async () => {
        await nextTick

        await options().removeStartWhitespace()
        await options().removeEndWhitespace()
        await options().insertParagraphEndStop()
        await options().removeExtraWhitespace()
        await options().resetEntityRaw()

        CONTEXT.load()

        toast.success(t('toast.corrector.apply'))
      })
      .finally(() => {})
      .catch((e) => {
        toast.error(t('toast.generics.error'))
      })
  }

  return { options, apply }
}
