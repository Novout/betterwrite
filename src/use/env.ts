import { Callback } from '@/types/utils'

export const useEnv: Callback<any> = () => {
  const projectEmpty = (): string => {
    return import.meta.env.VITE_PROJECT_EMPTY as string
  }

  const projectLocalStorage = () => {
    return import.meta.env.VITE_LOCAL_STORAGE as string
  }

  const isEmptyProject = (name: string) => {
    return name === useEnv().projectEmpty()
  }

  return { projectEmpty, projectLocalStorage, isEmptyProject }
}
