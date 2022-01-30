import {
  OnFocusOptions,
  V2RawApply,
  V2RawNormalizeType,
  V2RawSet,
  Entity,
} from 'better-write-types'
import { useClipboard } from '@vueuse/core'
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

    return { convert, pdfConvert }
  }

  const v2 = () => {
    const html = () => {
      const bold = () => {
        const open = () => {
          return '<span class="font-bold text-sm text-theme-editor-bold-text hover:text-theme-editor-bold-text-hover active:text-theme-editor-bold-text-active">'
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
          return '<span class="italic text-sm text-theme-editor-italic-text hover:text-theme-editor-italic-text-hover active:text-theme-editor-italic-text-active">'
        }

        const close = () => {
          return '</span>'
        }

        const length = () => {
          return open().length + close().length
        }

        return { open, close, length }
      }

      const error = () => {
        const open = () => {
          return '<span style="background-color: rgba(255, 130, 130, 0.2);">'
        }

        const close = () => {
          return '</span>'
        }

        const length = () => {
          return open().length + close().length
        }

        const item = (content: string) => {
          return open() + content + close()
        }

        return { open, close, length, item }
      }

      const correct = () => {
        const open = () => {
          return '<span style="background-color: rgba(150, 255, 150, 0.2);">'
        }

        const close = () => {
          return '</span>'
        }

        const length = () => {
          return open().length + close().length
        }

        const item = (content: string) => {
          return open() + content + close()
        }

        return { open, close, length, item }
      }

      return { italic, bold, error, correct }
    }

    const style = (entity: Entity, style: any) => {
      return [
        'editable overflow-hidden w-full break-words bg-theme-editor-entity-background hover:bg-theme-editor-entity-background-hover active:bg-theme-editor-entity-background-active',
        entity.type === 'paragraph'
          ? 'text-justify text-theme-editor-entity-text hover:text-theme-editor-entity-text-hover active:text-theme-editor-entity-text-active'
          : '',
        entity.type === 'paragraph' ? style.paragraph.fontSize : '',
        entity.type === 'paragraph' ? style.paragraph.fontFamily : '',
        entity.type === 'paragraph' ? style.paragraph.fontColor : '',
        entity.type === 'paragraph' ? style.paragraph.fontWeight : '',

        entity.type === 'heading-one'
          ? 'text-center text-2xl pb-10 pt-10 text-theme-editor-entity-heading-one hover:text-theme-editor-entity-heading-one-hover active:text-theme-editor-entity-heading-one-active'
          : '',
        entity.type === 'heading-one' ? style.heading.one.fontSize : '',
        entity.type === 'heading-one' ? style.heading.one.fontFamily : '',
        entity.type === 'heading-one' ? style.heading.one.fontColor : '',
        entity.type === 'heading-one' ? style.heading.one.fontWeight : '',

        entity.type === 'heading-two'
          ? 'text-center pb-3 pt-8 text-theme-editor-entity-heading-two hover:text-theme-editor-entity-heading-two-hover active:text-theme-editor-entity-heading-two-active'
          : '',
        entity.type === 'heading-two' ? style.heading.two.fontSize : '',
        entity.type === 'heading-two' ? style.heading.two.fontFamily : '',
        entity.type === 'heading-two' ? style.heading.two.fontColor : '',
        entity.type === 'heading-two' ? style.heading.two.fontWeight : '',

        entity.type === 'heading-three'
          ? 'text-center pb-2 pt-5 text-theme-editor-entity-heading-three hover:text-theme-editor-entity-heading-three-hover active:text-theme-editor-entity-heading-three-active'
          : '',
        entity.type === 'heading-three' ? style.heading.three.fontSize : '',
        entity.type === 'heading-three' ? style.heading.three.fontFamily : '',
        entity.type === 'heading-three' ? style.heading.three.fontColor : '',
        entity.type === 'heading-three' ? style.heading.three.fontWeight : '',

        entity.type === 'page-break'
          ? 'cursor-default mt-2 mb-6 border-b-8 border-theme-border-1 border-theme-editor-entity-page'
          : '',

        entity.type === 'line-break'
          ? 'cursor-default mt-2 mb-6 border-b-8 border-dashed border-theme-editor-entity-line'
          : '',

        entity.visual.info
          ? 'bg-theme-editor-entity-info hover:bg-theme-editor-entity-info-hover active:bg-theme-editor-entity-info-active'
          : '',
        entity.visual.warning
          ? 'bg-theme-editor-entity-warning hover:bg-theme-editor-entity-warning-hover active:bg-theme-editor-entity-warning-active'
          : '',
        entity.visual.error
          ? 'bg-theme-editor-entity-error hover:bg-theme-editor-entity-error-hover active:bg-theme-editor-entity-error-active'
          : '',
      ]
    }

    const make = () => {
      const image = (entity: Entity) => {
        if (!support().images(entity.external?.image?.name as string)) {
          return `<div class="flex wb-text text-xl items-end w-full justify-center py-5">
          <svg id="unsupported-extension-image" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="h-7 w-7" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><g stroke-width="1.5" fill="none"><path d="M12 8v4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 16.01l.01-.011" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 3H4v3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 11v2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 11v2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 3h5v3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 21H4v-3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21h5v-3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
          </div>`
        }

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

      const set = (el: HTMLDivElement, offset: number, focus = true) => {
        useUtils().cursor().setCurrentCursorPosition(offset, el)
        if (focus) el.focus()
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

      const focus = ({ input, position, offset }: OnFocusOptions) => {
        switch (position) {
          case 'start':
            set(input as HTMLDivElement, 0)
            break
          case 'offset':
            set(input as HTMLDivElement, offset as number)
            break
          case 'end':
            set(input as HTMLDivElement, input?.innerHTML.length as any)
            break
          case 'auto':
            input?.focus()
            break
        }
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

      return { set, html, index, end, start, empty, value, object, focus }
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

        const not = () => {
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
        }

        if (!wrap || wrap !== target.value) {
          not()

          return
        }

        if (set.type !== 'simple') {
          if (target.value === set.content) {
            _ += set.content
            return
          }

          not()

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

        // if (entity.type !== 'paragraph') return entity.raw

        return normalize(entity.raw, 'editor')
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

    const normalize = (
      content: string,
      type: V2RawNormalizeType = 'simple'
    ) => {
      const BWTags = (str: string) => {
        return str
          .replaceAll(html().bold().open(), '')
          .replaceAll(html().bold().close(), '')
          .replaceAll(html().italic().open(), '')
          .replaceAll(html().italic().close(), '')
      }

      const EditorTags = (str: string) => {
        return str.replaceAll(/<(?!\/?span(?=>|\s?.*>))\/?.*?>/g, '')
      }

      const All = (str: string) => {
        return str.replaceAll(/<\/?[^>]+(>|$)/g, '')
      }

      if (type === 'simple') {
        return BWTags(content)
      } else if (type === 'editor') {
        return EditorTags(content)
      } else if (type === 'full') {
        return All(content)
      }
    }

    const copy = () => {
      navigator.clipboard.readText().then((value: string) => {
        useClipboard().copy(value)
      })
    }

    const support = () => {
      const images = (file: string) => {
        return (
          file.includes('svg') ||
          file.includes('png') ||
          file.includes('jpeg') ||
          file.includes('jpg')
        )
      }

      return { images }
    }

    return {
      html,
      caret,
      apply,
      validate,
      purge,
      make,
      style,
      normalize,
      copy,
      support,
    }
  }

  return { v1, v2 }
}
