import { Callback } from '@/types/utils'

export const useDefines: Callback<any> = () => {
  const shortcuts = (k: string) => {
    return {
      localSaveProject: 'ctrl > s',
    }[k]
  }

  return {
    shortcuts,
  }
}
