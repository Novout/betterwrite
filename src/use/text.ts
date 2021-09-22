export const useText = () => {
  const kebab = (text: string) => {
    return text.toLowerCase().replaceAll(' ', '-')
  }

  return { kebab }
}
