import { useAddonsStore } from '@/store/addons'
import { useContextStore } from '@/store/context'
import { useProjectStore } from '@/store/project'
import { useStorage } from './storage/storage'
import { nextTick } from 'vue'
import { useProject } from './project'
import { Entity } from 'better-write-types'
import { useEditorStore } from '../store/editor'
import { useRaw } from './raw'
import { useEnv } from './env'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

export const useCorrector = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const ADDONS = useAddonsStore()

  const storage = useStorage()
  const project = useProject()
  const raw = useRaw()
  const env = useEnv()
  const { isLoading } = useNProgress()
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

          if (last !== '.' && last !== ':' && last !== '/') entity.raw += '.'
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
          entity.raw = raw.v2().normalize(entity.raw, 'full') || env.emptyLine()
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
    isLoading.value = true

    storage
      .normalize()
      .then(async () => {
        PROJECT.updateContext(CONTEXT.$state)

        await nextTick

        await options().removeStartWhitespace()
        await options().removeEndWhitespace()
        await options().insertParagraphEndStop()
        await options().removeExtraWhitespace()
        await options().resetEntityRaw()

        CONTEXT.load(PROJECT.pages[0])

        toast.success(t('toast.corrector.apply'))
      })
      .finally(() => {
        isLoading.value = false
      })
      .catch((e) => {
        console.log('here?', e)
        toast.error(t('toast.generics.error'))
      })
  }

  return { options, apply }
}
