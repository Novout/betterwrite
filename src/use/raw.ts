import { ContextStatePageContent } from '@/types/context'
import { Callback } from '@/types/utils'

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
        final += '<span class="italic text-xs">'
      } else if (letter === '*' && _italic) {
        final += '</span>'
        _italic = false
      } else if (letter === '&' && !_bold) {
        _bold = true
        final += '<span class="font-bold text-xs">'
      } else if (letter === '&' && _bold) {
        final += '</span>'
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
