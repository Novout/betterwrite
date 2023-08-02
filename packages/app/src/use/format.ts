export const useFormat = () => {
  const simple = (
    date: Date,
    type: 'default' | 'resume' | 'iso' = 'default',
  ): string => {
    if (type === 'iso') {
      return date.toISOString()
    }

    return type === 'default'
      ? `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      : `${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${
          (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
        }`
  }

  const actually = (type: 'default' | 'resume' | 'iso' = 'default'): string => {
    return simple(new Date(), type)
  }

  const lastTime = (updatedAt: string) => {
    const newDate = updatedAt ?? actually()

    return newDate
  }

  return { simple, actually, lastTime }
}
