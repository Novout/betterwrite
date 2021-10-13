import { format, formatRelative, parse } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'

export const useFormat = () => {
  const simple = (date: Date): string => {
    return format(date, 'yyyy-MM-dd HH:mm:ss')
  }

  const actually = (): string => {
    return simple(new Date())
  }

  const lastTime = (updatedAt: string) => {
    const updatedDate = parse(updatedAt, 'yyyy-MM-dd HH:mm:ss', new Date())

    return formatRelative(updatedDate, new Date(), {
      locale: document.documentElement.lang === 'pt-BR' ? ptBR : enUS,
    })
  }

  return { simple, actually, lastTime }
}
