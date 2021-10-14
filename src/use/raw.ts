import { ContextStatePageContent } from '@/types/context'

export const bold = () => {
  const open = () => {
    return '<span class="font-bold text-xs">'
  }

  const close = () => {
    return '</span>'
  }

  return { open, close }
}

export const italic = () => {
  const open = () => {
    return '<span class="italic text-xs">'
  }

  const close = () => {
    return '</span>'
  }

  return { open, close }
}

export const link = () => {
  const open = (tag: string) => {
    return `<a href="${tag}" target="_blank" class="underline text-xs">`
  }

  const close = () => {
    return ' </a>'
  }

  return { open, close }
}

export const image = () => {
  const define = (tag: string) => {
    return `<img src="${tag}" width="50%">`
  }

  return { define }
}

export const useRaw = () => {
  const convert = (page: ContextStatePageContent) => {
    let final = ''
    let _italic = false
    let _bold = false

    if (
      page.type === 'page-break' ||
      page.type === 'line-break' ||
      page.raw === '__EMPTY_LINE__'
    )
      return ''

    if (page.type !== 'paragraph' && page.type !== 'image') return page.raw

    const over: Array<string> = []
    const img: Array<string> = []

    let _raw = page.raw

    page.raw.split(/[ ]+/).forEach((word: string) => {
      if (word.includes('http://') || word.includes('https://')) over.push(word)
      if (word.includes('data:image/')) img.push(word)
    })

    over.forEach((word: string) => {
      _raw = _raw.replace(word, `${link().open(word)}${word}${link().close()}`)
    })

    img.forEach((img: string) => {
      _raw = _raw.replace(img, `${image().define(img)}`)
    })

    for (let i = 0; i < _raw.length; i++) {
      const letter = _raw.charAt(i)

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
    let str_link = ''

    let _italic = false
    let _bold = false
    let _link = false

    let _raw = raw
    const over: Array<string> = []

    raw.split(/[ ,]+/).forEach((word: string) => {
      if (word.includes('http://') || word.includes('https://')) over.push(word)
    })

    over.forEach((word: string) => {
      _raw = _raw.replace(word, `|${word}|`)
    })

    for (let i = 0; i < _raw.length; i++) {
      const letter = _raw.charAt(i)

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
      } else if (letter === '|' && !_link) {
        _link = true
        final.push(str)
        str = ''
      } else if (letter === '|' && _link) {
        const obj = {
          text: str_link.replace('http://', '').replace('https://', ''),
          link: str_link,
          decoration: 'underline',
        }
        final.push(obj)
        str_link = ''
        _link = false
      } else if (_link) {
        str_link += letter
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

      if (
        !_bold &&
        !_italic &&
        !_link &&
        letter !== '*' &&
        letter !== '&' &&
        letter !== '|'
      ) {
        str += letter
        if (i + 1 >= _raw.length) {
          final.push(str)
        }
      }
    }

    return final
  }

  return { convert, pdfConvert }
}
