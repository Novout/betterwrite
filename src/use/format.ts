import { format } from 'date-fns'

export const useFormat = () => {
  const simple = (date: Date): string => {
    return format(date, 'yyyy-MM-dd:HH:mm:ss.OOOO')
  }

  const actually = (): string => {
    return simple(new Date())
  }

  return { simple, actually }
}
