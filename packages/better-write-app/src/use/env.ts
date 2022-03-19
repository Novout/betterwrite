import { AccountPlan } from 'better-write-types'

export const useEnv = () => {
  const getCorrectLocalUrl = () => {
    return import.meta.env.PROD
      ? import.meta.env.VITE_BASE_URL
      : 'http://localhost:3000'
  }

  const projectEmpty = (): string => {
    return import.meta.env.VITE_PROJECT_EMPTY
  }

  const projectLocalStorage = () => {
    return import.meta.env.VITE_LOCAL_STORAGE
  }

  const isEmptyProject = (name: string) => {
    return name === useEnv().projectEmpty()
  }

  const dropboxKey = () => {
    return import.meta.env.VITE_DROPBOX_APP_KEY
  }

  const maxFonts = () => {
    return import.meta.env.VITE_GOOGLE_FONTS_MAX_FONTS
  }

  const production = () => {
    return import.meta.env.MODE === 'production'
  }

  const emptyLine = () => {
    return import.meta.env.VITE_EMPTY_LINE
  }

  const lineBreak = () => {
    return import.meta.env.VITE_LINE_BREAK
  }

  const pageBreak = () => {
    return import.meta.env.VITE_PAGE_BREAK
  }

  const initialLoad = () => {
    return import.meta.env.VITE_INITIAL_LOAD
  }

  const packageVersion = () => {
    return import.meta.env.PACKAGE_VERSION
  }

  const isDev = () => {
    return import.meta.env.DEV
  }

  const getAccountPlanLimit = (plan: AccountPlan) => {
    switch (plan) {
      case 'beginner':
        return import.meta.env.VITE_BEGINEER_LIMIT
      case 'intermediate':
        return import.meta.env.VITE_INTERMEDIATE_LIMIT
      case 'advanced':
        return import.meta.env.VITE_ADVANCED_LIMIT
      case 'unlimited':
        return import.meta.env.VITE_UNLIMITED_LIMIT
    }
  }

  return {
    dropboxKey,
    projectEmpty,
    projectLocalStorage,
    isEmptyProject,
    maxFonts,
    production,
    getCorrectLocalUrl,
    emptyLine,
    lineBreak,
    pageBreak,
    initialLoad,
    packageVersion,
    isDev,
    getAccountPlanLimit,
  }
}
