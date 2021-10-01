import { ContextStatePageContent } from '@/types/context'
import { Callback } from '@/types/utils'

export const bold: Callback<any> = () => {
  const open = () => {
    return '<span class="font-bold text-xs">'
  }

  const close = () => {
    return '</span>'
  }

  return { open, close }
}

export const italic: Callback<any> = () => {
  const open = () => {
    return '<span class="italic text-xs">'
  }

  const close = () => {
    return '</span>'
  }

  return { open, close }
}

export const useRaw: Callback<any> = () => {
  const convert = (page: ContextStatePageContent) => {
    let final = ''
    let _italic = false
    let _bold = false

    if (page.type !== 'paragraph') return page.raw

    for (let i = 0; i < page.raw.length; i++) {
      const letter = page.raw.charAt(i)

      if (letter === '*' && !_italic) {
        _italic = true
        final += italic().open()
      } else if (letter === '*' && _italic) {
        final += italic().close()
        _italic = false
      } else if (letter === '&' && !_bold) {
        _bold = true
        final += bold().open()
      } else if (letter === '&' && _bold) {
        final += bold().close()
        _bold = false
      } else {
        final += letter
      }
    }

    return final
  }

  const pdfConvert = (raw: string): Array<any> => {
    const final: Array<any> = []

    let str = ''
    let str_italic = ''
    let str_bold = ''

    let _italic = false
    let _bold = false

    for (let i = 0; i < raw.length; i++) {
      const letter = raw.charAt(i)

      if (letter === '*' && !_italic) {
        _italic = true
        final.push(str)
        str = ''
      } else if (letter === '*' && _italic) {
        const obj = {
          text: str_italic,
          italics: true,
        }
        final.push(obj)
        str_italic = ''
        _italic = false
      } else if (_italic) {
        str_italic += letter
      } else if (letter === '&' && !_bold) {
        _bold = true
        final.push(str)
        str = ''
      } else if (letter === '&' && _bold) {
        const obj = {
          text: str_bold,
          bold: true,
        }
        final.push(obj)
        str_bold = ''
        _bold = false
      } else if (_bold) {
        str_bold += letter
      }

      if (!_bold && !_italic && letter !== '*' && letter !== '&') {
        str += letter
        if (i + 1 >= raw.length) final.push(str)
      }
    }

    return final
  }

  return { convert, pdfConvert }
}
