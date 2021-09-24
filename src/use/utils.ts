import { Callback } from '@/types/utils'

export const useUtils: Callback<any> = () => {
  const delay = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  return { delay }
}
