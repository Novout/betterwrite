import { Callback } from '@/types/utils'

export const useDefines: Callback<any> = () => {
  const shortcuts = (k: string) => {
    return {
      localSaveProject: ['CTRL + S', 'ctrl > s'],
      localLoadProject: ['CTRL + P', 'ctrl > p'],
      newProject: ['CTRL + Shift + Q', 'ctrl > shift > q'],
      newChapter: ['CTRL + Q', 'ctrl > q'],
      deleteChapter: ['CTRL + D', 'ctrl > d'],
      configurationPDF: ['CTRL + Shift + G', 'ctrl > shift > g'],
      generatePDF: ['CTRL + G', 'ctrl > g'],
      switcherRawText: ['CTRL + H', 'ctrl > h'],
      logger: ['CTRL + L', 'ctrl > l'],
    }[k]
  }

  const pdf: Callback<any> = () => {
    const fontFamily = (): Array<string> => {
      return ['Poppins', 'Raleway']
    }

    return { fontFamily }
  }

  return {
    shortcuts,
    pdf,
  }
}
