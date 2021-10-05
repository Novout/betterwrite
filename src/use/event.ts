export const useEvent = () => {
  const stopAll = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return { stopAll }
}
