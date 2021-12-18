import { Callback } from '@/types/utils'
import { useLocalStorage } from './storage/local'
import { useProject } from './project'

export const useDestroy = () => {
  const local = useLocalStorage()
  const project = useProject()

  const init: Callback<any> = () => {
    project.destroy()
    local.onSaveProject()
  }

  return { init }
}
