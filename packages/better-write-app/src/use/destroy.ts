import { useLocalStorage } from './storage/local'
import { useProject } from './project'

export const useDestroy = () => {
  const local = useLocalStorage()
  const project = useProject()

  const init = () => {
    project.destroy()
    local.onSaveProject()
  }

  return { init }
}
