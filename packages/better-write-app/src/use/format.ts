export const useFormat = () => {
  const simple = (
    date: Date,
    type: 'default' | 'resume' = 'default'
  ): string => {
    return type === 'default'
      ? `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      : `${date.getHours()}:${date.getMinutes()}`
  }

  const actually = (type: 'default' | 'resume' = 'default'): string => {
    return simple(new Date(), type)
  }

  const lastTime = (updatedAt: string) => {
    const newDate = updatedAt ?? actually()
    
    return newDate
  }

  return { simple, actually, lastTime }
}
