import { Entity } from '@/types/context'
import { V2RawApply, V2RawSet } from '@/types/raw'
import { useUtils } from './utils'

export const bold = () => {
  const open = () => {
    return '<span class="font-bold text-sm">'
  }

  const close = () => {
    return '</span>'
  }

  return { open, close }
}

export const italic = () => {
  const open = () => {
    return '<span class="italic text-sm">'
  }

  const close = () => {
    return '</span>'
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
  const v1 = () => {
    const landingConvert = (raw: string) => {
      let final = ''
      let _italic = false
      let _bold = false

      const over: Array<string> = []

      if (!raw) return ''

      let _raw = raw

      raw.split(/[ ]+/).forEach((word: string) => {
        if (word.includes('http://') || word.includes('https://'))
          over.push(word)
      })

      over.forEach((word: string) => {
        _raw = _raw.replace(
          word,
          `${link().open(word)}${word}${link().close()}`
        )
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
        if (word.includes('http://') || word.includes('https://'))
          over.push(word)
      })

      over.forEach((word: string) => {
        _raw = _raw.replace(
          word,
          `${link().open(word)}${word}${link().close()}`
        )
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
        if (word.includes('http://') || word.includes('https://'))
          over.push(word)
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

  const v2 = () => {
    const html = () => {
      const bold = () => {
        const open = () => {
          return '<span class="font-bold text-sm">'
        }

        const close = () => {
          return '</span>'
        }

        const length = () => {
          return open().length + close().length
        }

        return { open, close, length }
      }

      const italic = () => {
        const open = () => {
          return '<span class="italic text-sm">'
        }

        const close = () => {
          return '</span>'
        }

        const length = () => {
          return open().length + close().length
        }

        return { open, close, length }
      }

      return { italic, bold }
    }

    const style = (entity: Entity, style: any) => {
      return [
        'overflow-hidden w-full text-sm bg-transparent break-words',
        entity.type === 'paragraph' ? style.paragraph.indent : '',
        entity.type === 'paragraph' ? 'text-justify' : '',
        entity.type === 'paragraph' ? style.paragraph.fontSize : '',
        entity.type === 'paragraph' ? style.paragraph.fontFamily : '',
        entity.type === 'paragraph' ? style.paragraph.fontColor : '',
        entity.type === 'paragraph' ? style.paragraph.fontWeight : '',

        entity.type === 'heading-one' ? 'text-center pb-10 pt-10' : '',
        entity.type === 'heading-one' ? style.heading.one.fontSize : '',
        entity.type === 'heading-one' ? style.heading.one.fontFamily : '',
        entity.type === 'heading-one' ? style.heading.one.fontColor : '',
        entity.type === 'heading-one' ? style.heading.one.fontWeight : '',

        entity.type === 'heading-two' ? 'text-center pb-3 pt-8' : '',
        entity.type === 'heading-two' ? style.heading.two.fontSize : '',
        entity.type === 'heading-two' ? style.heading.two.fontFamily : '',
        entity.type === 'heading-two' ? style.heading.two.fontColor : '',
        entity.type === 'heading-two' ? style.heading.two.fontWeight : '',

        entity.type === 'heading-three' ? 'text-center pb-2 pt-5' : '',
        entity.type === 'heading-three' ? style.heading.three.fontSize : '',
        entity.type === 'heading-three' ? style.heading.three.fontFamily : '',
        entity.type === 'heading-three' ? style.heading.three.fontColor : '',
        entity.type === 'heading-three' ? style.heading.three.fontWeight : '',

        entity.type === 'page-break'
          ? 'cursor-default my-4 border-b-8 border-gray-400 dark:border-gray-900'
          : '',

        entity.type === 'line-break'
          ? 'cursor-default my-4 border-b-8 border-dashed border-gray-400 dark:border-gray-800'
          : '',
      ]
    }

    const make = () => {
      const image = (entity: Entity) => {
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

      const italic = (content: string) => {
        return html().italic().open() + content + html().italic().close()
      }

      const bold = (content: string) => {
        return html().bold().open() + content + html().bold().close()
      }

      return { image, italic, bold }
    }

    const caret = () => {
      const isSupported = () => {
        return typeof window.getSelection !== 'undefined'
      }

      const index = (el: Element) => {
        let position = 0
        if (isSupported()) {
          const selection = window.getSelection()

          if (!selection) return -1

          if (selection.rangeCount !== 0) {
            const range = selection.getRangeAt(0)
            const preCaretRange = range.cloneRange()
            preCaretRange.selectNodeContents(el)
            preCaretRange.setEnd(range.endContainer, range.endOffset)
            position = preCaretRange.toString().length
          }
        }

        return position
      }

      const end = (el: HTMLDivElement) => {
        return index(el) === el.innerText.length
      }

      const start = (el: HTMLDivElement) => {
        return index(el) === 0
      }

      const empty = (el: HTMLDivElement) => {
        return start(el) && el.innerText.length === 0
      }

      const value = (el: HTMLDivElement): string => {
        return (window.getSelection() as any)?.toString()
      }

      const object = (el: HTMLDivElement) => {
        return {
          isSupported: isSupported(),
          inEnd: end(el),
          inStart: start(el),
          position: index(el),
          empty: empty(el),
          value: value(el),
        }
      }

      return { html, index, end, start, empty, value, object }
    }

    const validate = (arr: Array<string>): Array<V2RawSet> => {
      const final: Array<V2RawSet> = []
      let set: false | 'bold' | 'italic' = false

      arr.forEach((raw: string) => {
        if (set === 'italic') {
          final.push({
            content: raw,
            type: 'italic',
          })

          set = false
          return
        }

        if (raw === html().italic().open()) {
          set = 'italic'
          return
        }

        if (set === 'bold') {
          final.push({
            content: raw,
            type: 'bold',
          })

          set = false
          return
        }

        if (raw === html().bold().open()) {
          set = 'bold'
          return
        }

        if (raw === html().italic().close() || raw === html().bold().close())
          return

        final.push({
          content: raw,
          type: 'simple',
        })
      })

      return final
    }

    const apply = ({ existent, type, input }: V2RawApply) => {
      let _: string = ''
      let letterCount: number = 0

      const target = caret().object(input)

      const vld = validate(existent.split(useUtils().regex().htmlTags()))

      vld.forEach((set: V2RawSet) => {
        const initial = target.position - letterCount
        const finish = initial - target.value.length

        const wrap = set.content.substring(initial, finish)

        if (wrap !== target.value) {
          switch (set.type) {
            case 'italic':
              _ += make().italic(set.content)
              break
            case 'bold':
              _ += make().bold(set.content)
              break
            case 'simple':
              _ += set.content
              break
          }

          letterCount += set.content.length

          return
        }

        if (set.type !== 'simple') {
          return
        }

        const mutate =
          type === 'bold'
            ? make().bold(target.value)
            : make().italic(target.value)
        const start = target.position - letterCount
        const end = start - target.value.length

        const reverse =
          set.content.slice(0, end) + mutate + set.content.slice(start)

        _ += reverse
      })

      return _
    }

    const purge = () => {
      const editor = (entity: Entity) => {
        if (
          entity.type === 'page-break' ||
          entity.type === 'line-break' ||
          entity.raw === '__EMPTY_LINE__'
        )
          return ''

        if (entity.type === 'image') {
          return make().image(entity)
        }

        if (entity.type !== 'paragraph') return entity.raw

        return entity.raw
      }

      const pdf = (raw: string): Array<any> => {
        const final: Array<any> = []
        let set: false | 'bold' | 'italic' = false

        const rest = raw.split(useUtils().regex().htmlTags())

        rest.forEach((content: string) => {
          // italic
          if (set === 'italic') {
            final.push({
              text: content,
              italics: true,
            })
            set = false
            return
          }

          if (content === html().italic().open()) {
            set = 'italic'
            return
          }

          if (set === 'bold') {
            final.push({
              text: content,
              bold: true,
            })
            set = false
            return
          }

          // bold
          if (content === html().bold().open()) {
            set = 'bold'
            return
          }

          if (
            content === html().italic().close() ||
            content === html().bold().close()
          )
            return

          // http
          if (content.match(useUtils().regex().links())) {
            const fin = raw.split(useUtils().regex().links())

            fin.forEach((str: string) => {
              if (str.match(useUtils().regex().links())) {
                final.push({
                  text: str.replace('http://', '').replace('https://', ''),
                  link: str,
                  decoration: 'underline',
                })
              } else {
                final.push(str)
              }
            })

            return
          }

          final.push(content)
        })

        return final
      }

      return { apply, editor, pdf }
    }

    return { html, caret, apply, validate, purge, make, style }
  }

  return { v1, v2 }
}
