import { Callback } from 'better-write-types'
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
