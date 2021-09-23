import { format } from 'date-fns'
import { Callback } from '@/types/utils'

export const useFormat: Callback<any> = () => {
  const simple = (date: Date): string => {
    return format(date, 'yyyy-MM-dd:HH:mm:ss.OOOO')
  }

  const actually = (): string => {
    return simple(new Date())
  }

  return { simple, actually }
}
