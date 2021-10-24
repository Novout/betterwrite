import { Entity } from '@/types/context'

export const bold = () => {
  const open = () => {
    return '<span class="font-bold text-sm"> '
  }

  const close = () => {
    return ' </span>'
  }

  return { open, close }
}

export const italic = () => {
  const open = () => {
    return '<span class="italic text-sm"> '
  }

  const close = () => {
    return ' </span>'
  }

  return { open, close }
}

export const link = () => {
  const open = (tag: string) => {
    return `<a href="${tag}" target="_blank" class="underline text-sm">`
  }

  const close = () => {
    return '</a>'
  }

  return { open, close }
}

export const useRaw = () => {
  const landingConvert = (raw: string) => {
    let final = ''
    let _italic = false
    let _bold = false

    const over: Array<string> = []

    if (!raw) return ''

    let _raw = raw

    raw.split(/[ ]+/).forEach((word: string) => {
      if (word.includes('http://') || word.includes('https://')) over.push(word)
    })

    over.forEach((word: string) => {
      _raw = _raw.replace(word, `${link().open(word)}${word}${link().close()}`)
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

  const convert = (entity: Entity) => {
    let final = ''
    let _italic = false
    let _bold = false

    if (
      entity.type === 'page-break' ||
      entity.type === 'line-break' ||
      entity.raw === '__EMPTY_LINE__'
    )
      return ''

    if (entity.type === 'image') {
      return `<div class="flex wb-text text-xl items-end w-full justify-center py-5">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="ml-1">${entity.external?.image?.name}</p>
      </div>`
    }

    if (entity.type !== 'paragraph') return entity.raw

    const over: Array<string> = []

    let _raw = entity.raw

    entity.raw.split(/[ ]+/).forEach((word: string) => {
      if (word.includes('http://') || word.includes('https://')) over.push(word)
    })

    over.forEach((word: string) => {
      _raw = _raw.replace(word, `${link().open(word)}${word}${link().close()}`)
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

  return { convert, landingConvert, pdfConvert }
}
