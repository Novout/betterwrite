export const useEnv = () => {
  const getCorrectLocalUrl = () => {
    return import.meta.env.PROD
      ? 'https://novout.github.io/better-write/'
      : 'http://localhost:3000/better-write/'
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
    return import.meta.env.VITE_EMPTY_LINE
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
  }
}
