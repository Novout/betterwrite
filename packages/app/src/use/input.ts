export const useInput = () => {
  const pasteText = (event: any): Array<string> => {
    let arr: Array<string> = event.clipboardData.getData('text').split('\n')

    arr = arr.filter((data: string) => data !== '')

    arr = arr.map((data: string) => data.replace(/\s+/g, ' ').trim())

    return arr
  }

  const prevent = (input: HTMLInputElement) => {
    input.addEventListener('keydown', (event: Event) => {
      // TODO: Edge and IE11 insert in a / event
      // event.stopPropagation()
    })
  }

  const getScrollHeight = (el: any) => {
    let savedValue = el.value
    el.value = ''
    el._baseScrollHeight = el.scrollHeight
    el.value = savedValue
  }

  const expandTextArea = (el: HTMLTextAreaElement): void => {
    if (!el) return

    el.style.height = '5px'
    el.style.height = el.scrollHeight + 'px'
  }

  return { pasteText, prevent, getScrollHeight, expandTextArea }
}
