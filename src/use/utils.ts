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

  return { delay, prevent, array }
}
