import { Callback } from '@/types/utils'

export const useDefines: Callback<any> = () => {
  const shortcuts = (k: string) => {
    return {
      localSaveProject: ['CTRL + S', 'ctrl > s'],
      localLoadProject: ['CTRL + L', 'ctrl > l'],
    }[k]
  }

  return {
    shortcuts,
  }
}
