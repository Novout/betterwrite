export const useEntity = () => {
  const entry = (input: string, target: string): boolean => {
    return (
      input.startsWith('/' + target) ||
      input.startsWith('/' + target.toUpperCase())
    )
  }

  return { entry }
}
