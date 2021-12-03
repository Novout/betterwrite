export const useEnv = () => {
  const getCorrectLocalUrl = () => {
    return import.meta.env.PROD
      ? 'https://better-write.vercel.app'
      : 'http://localhost:3000'
  }

  const projectEmpty = (): string => {
    return import.meta.env.VITE_PROJECT_EMPTY as string
  }

  const projectLocalStorage = () => {
    return import.meta.env.VITE_LOCAL_STORAGE as string
  }

  const isEmptyProject = (name: string) => {
    return name === useEnv().projectEmpty()
  }

  const dropboxKey = () => {
    return import.meta.env.VITE_DROPBOX_APP_KEY as string
  }

  const maxFonts = () => {
    return parseInt(
      import.meta.env.VITE_GOOGLE_FONTS_MAX_FONTS as string
    ) as number
  }

  const production = () => {
    return import.meta.env.MODE === 'production'
  }

  const emptyLine = () => {
    return import.meta.env.VITE_EMPTY_LINE as string
  }

  const lineBreak = () => {
    return import.meta.env.VITE_LINE_BREAK as string
  }

  const pageBreak = () => {
    return import.meta.env.VITE_PAGE_BREAK as string
  }

  const initialLoad = () => {
    return import.meta.env.VITE_INITIAL_LOAD as string
  }

  const packageVersion = () => {
    return import.meta.env.PACKAGE_VERSION
  }

  const isDev = () => {
    return import.meta.env.DEV
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
  }
}
