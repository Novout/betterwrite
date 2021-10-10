import { Callback } from '@/types/utils'

export const useText = () => {
  const kebab: Callback<string, string> = (text: string) => {
    return text.toLowerCase().replaceAll(' ', '-')
  }

  return { kebab }
}
