import { useAddonsStore } from '@/store/addons'
import { useContextStore } from '@/store/context'
import { useProjectStore } from '@/store/project'
import { useStorage } from './storage/storage'
import { nextTick } from 'vue'
import { useNProgress } from '@vueuse/integrations'

export const useCorrector = () => {
  const PROJECT = useProjectStore()
  const CONTEXT = useContextStore()
  const ADDONS = useAddonsStore()

  const storage = useStorage()
  const { isLoading } = useNProgress()

  const options = () => {
    const removeStartWhitespace = () => {
      if (ADDONS.corrector.options[0].option) {
        PROJECT.pages.forEach((page) => {
          page.entities.forEach((entity) => {
            entity.raw = entity.raw.trimStart()
          })
        })
      }
    }

    const removeEndWhitespace = () => {
      if (ADDONS.corrector.options[1].option) {
        PROJECT.pages.forEach((page) => {
          page.entities.forEach((entity) => {
            entity.raw = entity.raw.trimEnd()
          })
        })
      }
    }

    return { removeStartWhitespace, removeEndWhitespace }
  }

  const apply = () => {
    isLoading.value = true

    storage.normalize().then(async () => {
      PROJECT.updateContext(CONTEXT.$state)

      await nextTick

      await options().removeStartWhitespace()
      await options().removeEndWhitespace()

      CONTEXT.load(PROJECT.pages[0])

      await nextTick

      isLoading.value = false
    })
  }

  return { options, apply }
}
