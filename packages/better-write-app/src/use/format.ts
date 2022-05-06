import { format, formatRelative, parse } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'

export const useFormat = () => {
  const simple = (
    date: Date,
    type: 'default' | 'resume' = 'default'
  ): string => {
    return type === 'default'
      ? format(date, 'yyyy-MM-dd HH:mm:ss')
      : format(date, 'HH:mm')
  }

  const actually = (type: 'default' | 'resume' = 'default'): string => {
    return simple(new Date(), type)
  }

  const lastTime = (updatedAt: string) => {
    const updatedDate = parse(updatedAt, 'yyyy-MM-dd HH:mm:ss', new Date())

    return formatRelative(updatedDate, new Date(), {
      locale: document.documentElement.lang === 'pt-BR' ? ptBR : enUS,
    })
  }

  return { simple, actually, lastTime }
}
