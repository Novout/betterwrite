export const useInput = () => {
  const pasteText = (event: any): Array<string> => {
    const arr = event.clipboardData.getData('text').split('\n')

    return arr.filter((data: string) => data !== '')
  }

  return { pasteText }
}
