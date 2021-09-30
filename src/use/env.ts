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

  const maxFonts = () => {
    return parseInt(
      import.meta.env.VITE_GOOGLE_FONTS_MAX_FONTS as string
    ) as number
  }

  const production = () => {
    return import.meta.env.MODE === 'production'
  }

  return {
    projectEmpty,
    projectLocalStorage,
    isEmptyProject,
    maxFonts,
    production,
  }
}
