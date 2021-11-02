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

  const text = () => {
    const getSelection = (data: string, input: HTMLTextAreaElement) => {
      return data.substring(input.selectionStart, input.selectionEnd)
    }

    return { getSelection }
  }

  return { delay, prevent, array, join, text }
}
