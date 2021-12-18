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

  const text = () => {
    const getSelection = (data: string, input: HTMLTextAreaElement) => {
      return data.substring(input.selectionStart, input.selectionEnd)
    }

    const kebab = (text: string) => {
      return text.toLowerCase().replaceAll(' ', '-')
    }

    return { getSelection, kebab }
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

    return { links, htmlTags }
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
  return {
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
  }
}
