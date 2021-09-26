import { Callback } from '@/types/utils'

export const useUtils: Callback<any> = () => {
  const delay = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  const prevent = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return { delay, prevent }
}
