import { destr } from 'destr'
import { nanoid } from 'nanoid'

export const useUtils = () => {
  const delay = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  const prevent = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const array = () => {
    const insert = (arr: Array<any>, index: number, ...newItems: any) => [
      ...arr.slice(0, index),
      ...newItems,
      ...arr.slice(index),
    ]

    const mapToObject = (m: any) =>
      [...m].reduce((o, v) => {
        o[v[0]] = v[1]
        return o
      }, {})

    return { insert, mapToObject }
  }

  const join = (parts: any, sep?: any): string => {
    var separator = sep || '/'
    var replace = new RegExp(separator + '{1,}', 'g')
    return parts.join(separator).replace(replace, separator)
  }

  const id = () => {
    const uuidv4 = () => {
      var d = new Date().getTime() //Timestamp
      var d2 =
        (typeof performance !== 'undefined' &&
          performance.now &&
          performance.now() * 1000) ||
        0 //Time in microseconds since page-load or 0 if unsupported
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = Math.random() * 16 //random number between 0 and 16
          if (d > 0) {
            //Use timestamp until depleted
            r = (d + r) % 16 | 0
            d = Math.floor(d / 16)
          } else {
            //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0
            d2 = Math.floor(d2 / 16)
          }
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        }
      )
    }

    const nano = (options?: {
      prefix?: string
      suffix?: string
      length?: number
    }) => {
      return `${options?.prefix ? `${options?.prefix}-` : ''}${nanoid(
        options?.length ?? 25
      )}${options?.suffix ? `-${options?.suffix}` : ''}`
    }

    return { uuidv4, nano }
  }

  const text = () => {
    const getSelection = (data: string, input: HTMLTextAreaElement) => {
      return data.substring(input.selectionStart, input.selectionEnd)
    }

    const kebab = (text: string) => {
      return text.toLowerCase().replaceAll(' ', '-')
    }

    const randomLetter = () => {
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var charactersLength = characters.length

      return characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    const defaultWhitespace = (value: string): string => {
      return value.replace(/(&nbsp;|&#160|&#x20;)/gi, ' ')
    }

    const randomColor = () => {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    }

    return { getSelection, kebab, randomLetter, defaultWhitespace, randomColor }
  }

  const regex = () => {
    const links = () => {
      return new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
      )
    }

    const htmlTags = () => {
      return new RegExp(/(<[^<>]+>)/g)
    }

    const divTag = () => {
      return new RegExp(/<div>(.*?)<\/div>/)
    }

    const classTag = () => {
      return new RegExp(/\sclass="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/gi)
    }

    return { links, htmlTags, divTag, classTag }
  }

  const cursor = () => {
    const getCurrentCursorPosition = (parentElement: Element) => {
      var selection: any = window.getSelection(),
        charCount = -1,
        node

      if (selection.focusNode) {
        if (_isChildOf(selection.focusNode, parentElement)) {
          node = selection.focusNode
          charCount = selection.focusOffset

          while (node) {
            if (node === parentElement) {
              break
            }

            if (node.previousSibling) {
              node = node.previousSibling
              charCount += node.textContent.length
            } else {
              node = node.parentNode
              if (node === null) {
                break
              }
            }
          }
        }
      }

      return charCount
    }

    const setCurrentCursorPosition = (chars: any, element: Element) => {
      if (chars >= 0) {
        var selection: any = window.getSelection()

        let range = _createRange(element, { count: chars })

        if (range) {
          range.collapse(false)
          selection.removeAllRanges()
          selection.addRange(range)
        }
      }
    }

    const _createRange = (node: any, chars: any, range?: any) => {
      if (!range) {
        range = document.createRange()
        range.selectNode(node)
        range.setStart(node, 0)
      }

      if (chars.count === 0) {
        range.setEnd(node, chars.count)
      } else if (node && chars.count > 0) {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.length < chars.count) {
            chars.count -= node.textContent.length
          } else {
            range.setEnd(node, chars.count)
            chars.count = 0
          }
        } else {
          for (var lp = 0; lp < node.childNodes.length; lp++) {
            range = _createRange(node.childNodes[lp], chars, range)

            if (chars.count === 0) {
              break
            }
          }
        }
      }

      return range
    }

    const _isChildOf = (node: any, parentElement: any) => {
      while (node !== null) {
        if (node === parentElement) {
          return true
        }
        node = node.parentNode
      }

      return false
    }
    return { setCurrentCursorPosition, getCurrentCursorPosition }
  }

  const position = (el: HTMLElement) => {
    return {
      x: window.innerWidth / 2 + el.offsetWidth / 2,
      y: window.innerHeight / 2 + el.offsetHeight / 2,
    }
  }

  const support = () => {
    const images = (reader: any) => {
      return (
        !(reader.result as string).includes('data:image/') &&
        !(reader.result as string).includes('svg')
      )
    }

    return { images }
  }

  const path = () => {
    const resolve = (content: string) => {
      return `/${content}`
    }

    return { resolve }
  }

  const object = () => {
    const assign = (obj: any, prop: any, value: any) => {
      if (typeof prop === 'string') prop = prop.split('.')

      if (prop.length > 1) {
        var e = prop.shift()
        assign(
          (obj[e] =
            Object.prototype.toString.call(obj[e]) === '[object Object]'
              ? obj[e]
              : {}),
          prop,
          value
        )
      } else obj[prop[0]] = value
    }

    const getMemorySizeOfObject = (obj: Record<any, any>): string[] => {
      let bytes = 0

      function sizeOf(obj) {
        if (obj !== null && obj !== undefined) {
          switch (typeof obj) {
            case 'number':
              bytes += 8
              break
            case 'string':
              bytes += obj.length * 2
              break
            case 'boolean':
              bytes += 4
              break
            case 'object':
              const objClass = Object.prototype.toString.call(obj).slice(8, -1)

              if (objClass === 'Object' || objClass === 'Array') {
                for (let key in obj) {
                  if (!obj.hasOwnProperty(key)) continue
                  sizeOf(obj[key])
                }
              } else bytes += obj.toString().length * 2
              break
          }
        }

        return bytes
      }

      const formatByteSize = (bytes) => {
        if (bytes < 1024) return bytes + ' bytes'
        else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + ' KB'
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + ' MB'
        else return (bytes / 1073741824).toFixed(3) + ' GB'
      }

      const result = formatByteSize(sizeOf(obj)).split(' ')

      return result
    }

    return { assign, getMemorySizeOfObject }
  }

  const language = () => {
    const isoToCode = (iso: string) => {
      return (
        {
          'pt-BR': 'br',
          'en-US': 'en',
        }[iso] || 'en'
      )
    }

    const codeToIso = (code: string) => {
      return (
        {
          en: 'en-US',
          br: 'pt-BR',
        }[code] || 'en-US'
      )
    }

    return { isoToCode, codeToIso }
  }

  const convert = () => {
    const blobXmlToBase64 = (blob): Promise<string> => {
      const reader = new FileReader()
      reader.readAsText(blob)
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string)
        }
      })
    }

    const read = (file: File, type: 'json' | 'image' = 'json') => {
      return new Promise((res, rej) => {
        if (type === 'json') {
          const reader = new FileReader()
          reader.addEventListener('load', (event) => {
            const data = destr(event?.target?.result)

            res(data)
          })
          reader.readAsText(file)
        }

        if (type === 'image') {
          const reader = new FileReader()
          reader.addEventListener('load', (event) => {
            const data = destr(event?.target?.result)

            res(data)
          })
          reader.addEventListener('error', () => rej())
          reader.addEventListener('abort', () => rej())
          reader.readAsDataURL(file)
        }
      })
    }

    const hexToRgbA = (hex: string, alpha?: number): string => {
      alpha = alpha ? Number(alpha?.toFixed(2)) : alpha

      let c
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length == 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return (
          'rgba(' +
          [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
          ',' +
          (alpha || '1') +
          ')'
        )
      }

      return hex
    }

    return { blobXmlToBase64, read, hexToRgbA }
  }

  const context = () => {
    const fullscreen = () => {
      if (!window) return

      window.document.exitFullscreen().catch(() => {
        const target = window.document.querySelector('body')

        target?.requestFullscreen().catch(() => {})
      })
    }

    return { fullscreen }
  }

  const system = () => {
    const get = () => {
      let userAgent = window.navigator.userAgent,
        // @ts-ignore
        platform =
          // @ts-ignore
          window.navigator?.userAgentData?.platform ??
          // @ts-ignore
          window.navigator.platform,
        // @ts-ignore
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os: 'Mac OS' | 'iOS' | 'Windows' | 'Android' | 'Linux' | null = null

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS'
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS'
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows'
      } else if (/Android/.test(userAgent)) {
        os = 'Android'
      } else if (!os && /Linux/.test(platform)) {
        os = 'Linux'
      }

      return os
    }

    const isDesktop = () => {
      const os = get()

      return os === 'Linux' || os === 'Windows' || os === 'Mac OS'
    }

    const isMobile = () => {
      const os = get()

      return os === 'iOS' || os === 'Android'
    }

    return { get, isDesktop, isMobile }
  }

  return {
    id,
    position,
    delay,
    prevent,
    array,
    join,
    regex,
    text,
    cursor,
    support,
    path,
    object,
    language,
    convert,
    system,
    context,
  }
}
