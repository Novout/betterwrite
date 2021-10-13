import { Callback } from '@/types/utils'
import { useLocalStorage } from './storage/local'

export const useDestroy = () => {
  const local = useLocalStorage()

  const init: Callback<any> = () => {
    local.onSaveProject()
  }

  return { init }
}
