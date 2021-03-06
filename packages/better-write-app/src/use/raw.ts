import {
  OnFocusOptions,
  V2RawApply,
  V2RawNormalizeType,
  V2RawSet,
  Entity,
} from 'better-write-types'
import { useClipboard } from '@vueuse/core'
import { useUtils } from './utils'
import { useExternalsStore } from '@/store/externals'
import { useEnv } from './env'
import { useSubstitution } from './tools/substitution'
import { nextTick } from 'vue'
import { useContextStore } from '@/store/context'
import { useFactory } from './factory'
import { usePlugin } from 'better-write-plugin-core'
import { useAbsoluteStore } from '@/store/absolute'
import { useEditorStore } from '@/store/editor'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

export const bold = () => {
  const open = () => {
    return '<i class="font-bold">'
  }

  const close = () => {
    return '</i>'
  }

  const insert = (raw: string) => {
    return open() + raw + close()
  }

  return { open, close, insert }
}

export const italic = () => {
  const open = () => {
    return '<i class="italic">'
  }

  const close = () => {
    return '</i>'
  }

  const insert = (raw: string) => {
    return open() + raw + close()
  }

  return { open, close, insert }
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

export const html = () => {
  const insert = (str: string, index: number, middle: string) => {
    return str.substring(0, index) + middle + str.substring(index, str.length)
  }

  const bold = () => {
    const open = () => {
      return '<i class="font-bold text-sm text-theme-editor-bold-text hover:text-theme-editor-bold-text-hover active:text-theme-editor-bold-text-active">'
    }

    const close = () => {
      return '</i>'
    }

    const length = () => {
      return open().length + close().length
    }

    const insert = (raw: string) => {
      return open() + raw + close()
    }

    return { open, close, length, insert }
  }

  const italic = () => {
    const open = () => {
      return '<i class="italic text-sm text-theme-editor-italic-text hover:text-theme-editor-italic-text-hover active:text-theme-editor-italic-text-active">'
    }

    const close = () => {
      return '</i>'
    }

    const length = () => {
      return open().length + close().length
    }

    const insert = (raw: string) => {
      return open() + raw + close()
    }

    return { open, close, length, insert }
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

  const finder = () => {
    const replacer = (raw: string, target: string) => {
      return raw.replaceAll(target, item(target))
    }

    const open = () => {
      return '<span class="text-theme-editor-render-finder-text bg-theme-editor-render-finder-background">'
    }

    const close = () => {
      return '</span>'
    }

    const item = (content: string) => {
      return open() + content + close()
    }

    return { replacer, open, close, item }
  }

  const switcher = () => {
    const replacer = (raw: string, target: string) => {
      return raw.replaceAll(target, item(target))
    }

    const open = () => {
      return '<span class="text-theme-editor-render-switcher-text bg-theme-editor-render-switcher-background">'
    }

    const close = () => {
      return '</span>'
    }

    const item = (content: string) => {
      return open() + content + close()
    }

    return { replacer, open, close, item }
  }

  return { insert, italic, bold, error, correct, finder, switcher }
}

export const useRaw = () => {
  const CONTEXT = useContextStore()
  const EXTERNALS = useExternalsStore()
  const ABSOLUTE = useAbsoluteStore()
  const EDITOR = useEditorStore()

  const env = useEnv()
  const utils = useUtils()
  const plugin = usePlugin()
  const substitution = useSubstitution()
  const factory = useFactory()
  const toast = useToast()
  const { t } = useI18n()

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
    const block = () => {
      const text = () => {
        const parse = (text: string): string[] => {
          return text
            .split(utils.regex().divTag())
            .map((text) => text.replaceAll('<br>', ' '))
            .filter(
              (text) =>
                text && !text.includes('<div>') && !text.includes('</div>')
            )
        }

        const join = (texts: string[]): string => {
          return texts.reduce((acc, text, index) => {
            if (index === 0) return (acc += text)

            if (text === ' ') {
              return (acc += '<br>')
            }

            const aux = '<div>' + text + '</div>'

            acc += aux

            return acc
          }, '')
        }

        return { parse, join }
      }

      const drop = async (e: DragEvent, item: Entity) => {
        const target = e.dataTransfer?.items[0]

        if (
          target &&
          target.kind === 'file' &&
          target.type.includes('image/')
        ) {
          const file = await target.getAsFile()

          if (file) {
            utils
              .convert()
              .read(file, 'image')
              .then(async (data) => {
                const entity = factory.entity().create('image', data as string)

                entity.external!.image!.name = file.name

                CONTEXT.newInDropFile({
                  old: item,
                  insert: entity,
                })

                await nextTick

                plugin.emit('plugin-entity-create', {
                  data: item.raw,
                  index: CONTEXT.entities.indexOf(item),
                })
              })
              .catch(() => {
                toast(t('toast.entity.image.errorLoad'))
              })
          }
        }
      }

      const menu = async (e: MouseEvent, index: number) => {
        ABSOLUTE.entity.menu = false

        EDITOR.actives.entity.index = index

        if (EDITOR.actives.global.mouse.validLastSelection) {
          EDITOR.actives.global.mouse.validLastSelection = false
          return
        }

        e?.preventDefault()

        await nextTick

        ABSOLUTE.entity.menu = true
      }

      const style = (entity: Entity, type: 'main' | 'input' = 'input') => {
        switch (type) {
          case 'main':
            return [
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
      }

      return { text, drop, menu, style }
    }

    const make = () => {
      const italic = (content: string) => {
        return html().italic().open() + content + html().italic().close()
      }

      const bold = (content: string) => {
        return html().bold().open() + content + html().bold().close()
      }

      return { italic, bold }
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
        if (!el) return

        useUtils().cursor().setCurrentCursorPosition(offset, el)
        if (focus) el.focus()
      }

      const setEnd = (el: HTMLParagraphElement) => {
        if (!el) return

        el.focus()

        if (
          typeof window.getSelection != 'undefined' &&
          typeof document.createRange != 'undefined'
        ) {
          const range = document.createRange()
          range.selectNodeContents(el)
          range.collapse(false)

          const sel = window.getSelection()
          sel?.removeAllRanges()
          sel?.addRange(range)
          // @ts-ignore
        } else if (typeof document.body.createTextRange != 'undefined') {
          // @ts-ignore
          const textRange = document.body.createTextRange()
          textRange.moveToElementText(el)
          textRange.collapse(false)
          textRange.select()
        }
      }

      const end = (el: HTMLDivElement, force: boolean = false) => {
        if (force) {
          return (
            index(el) ===
            el.innerHTML.replaceAll(utils.regex().htmlTags(), '').length
          )
        }

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
            setEnd(input as HTMLDivElement)
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

      return {
        set,
        setEnd,
        html,
        index,
        end,
        start,
        empty,
        value,
        object,
        focus,
      }
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
      const finder = (entity: Entity): string => {
        if (
          entity.type === 'page-break' ||
          entity.type === 'line-break' ||
          entity.type === 'image' ||
          entity.raw === '__EMPTY_LINE__'
        )
          return ''

        if (!EXTERNALS.finder.value) return entity.raw

        return (
          html()
            .finder()
            .replacer(
              normalize(entity.raw, 'full') || '',
              EXTERNALS.finder.value
            ) || ''
        )
      }

      const switcher = (entity: Entity): string => {
        if (
          entity.type === 'page-break' ||
          entity.type === 'line-break' ||
          entity.type === 'image' ||
          entity.raw === '__EMPTY_LINE__'
        )
          return ''

        if (!EXTERNALS.switcher.value) return entity.raw

        return (
          html()
            .switcher()
            .replacer(
              normalize(entity.raw, 'full') || '',
              EXTERNALS.switcher.value
            ) || ''
        )
      }

      const editor = (entity: Entity) => {
        if (
          entity.type === 'page-break' ||
          entity.type === 'line-break' ||
          entity.raw === '__EMPTY_LINE__'
        )
          return ''

        return entity.raw
      }

      const pdf = (raw: string): Array<any> => {
        const final: Array<any> = []
        let set: false | 'bold' | 'italic' = false

        const _raw = substitution.purge(raw)

        const rest = _raw.split(useUtils().regex().htmlTags())

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

          /*
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
                set = false
              } else {
                final.push(str)
                set = false
              }
            })
            
            return
          }
          */

          final.push(content)
        })

        return final
      }

      return { apply, editor, pdf, switcher, finder }
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
        return str
          .replaceAll(/<\/?[^>]+(>|$)/g, '')
          .replaceAll(env.emptyLine(), '')
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
      block,
      html,
      caret,
      apply,
      validate,
      purge,
      make,
      normalize,
      copy,
      support,
    }
  }

  return { v1, v2 }
}
