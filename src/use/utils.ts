export const useUtils = () => {
  const delay = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  const prevent = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const array = () => {
    const insert = (arr: Array<any>, index: number, ...newItems: any) => [
      ...arr.slice(0, index),
      ...newItems,
      ...arr.slice(index),
    ]

    return { insert }
  }

  const join = (parts: any, sep?: any): string => {
    var separator = sep || '/'
    var replace = new RegExp(separator + '{1,}', 'g')
    return parts.join(separator).replace(replace, separator)
  }

  return { delay, prevent, array, join }
}
