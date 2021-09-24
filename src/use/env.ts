import { Callback } from '@/types/utils'

export const useEnv: Callback<any> = () => {
  const projectEmpty = (): string => {
    return import.meta.env.VITE_PROJECT_EMPTY as string
  }

  return { projectEmpty }
}
