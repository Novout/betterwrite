import { OnFocusOptions, Entity } from 'better-write-types'
import { useClipboard, useTextSelection } from '@vueuse/core'
import { useUtils } from './utils'
import { useExternalsStore } from '@/store/externals'
import { useStorage } from '@/use/storage/storage'
import { ComputedRef, nextTick } from 'vue'
import { useContextStore } from '@/store/context'
import { useFactory } from './factory'
import { usePlugin } from 'better-write-plugin-core'
import { useAbsoluteStore } from '@/store/absolute'
import { useEditorStore } from '@/store/editor'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { ImageToForcePNG } from 'better-write-image-converter'
import { ASTUtils } from 'better-write-contenteditable-ast'

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

  const utils = useUtils()
  const plugin = usePlugin()
  const storage = useStorage()
  const factory = useFactory()
  const toast = useToast()
  const { text } = useTextSelection()
  const { t } = useI18n()

  const v2 = () => {
    const block = () => {
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
                const raw = await ImageToForcePNG({
                  raw: data as string,
                  width: 2000,
                  height: 2000,
                })

                const entity = factory.entity().create('image', raw)

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

                await storage.normalize()
              })
              .catch(() => {
                toast.error(t('toast.entity.image.errorLoad'))
              })
          }
        }
      }

      const menu = async (e: MouseEvent | TouchEvent, index: number) => {
        ABSOLUTE.entity.menu = false

        EDITOR.actives.entity.index = index

        if (EDITOR.actives.global.mouse.validLastSelection && text.value) {
          EDITOR.actives.global.mouse.validLastSelection = false
          return
        }

        if (e) e?.preventDefault()

        await nextTick

        ABSOLUTE.entity.menu = true
      }

      const style = (entity: ComputedRef<Entity>) => {
        return [
          entity.value.visual.custom &&
          (!entity.value.visual.info ||
            !entity.value.visual.warning ||
            !entity.value.visual.error)
            ? { backgroundColor: entity.value.visual.custom }
            : {},
        ]
      }

      const c = (entity: Entity) => {
        return [
          entity.visual.info
            ? '!bg-theme-editor-entity-info hover:!bg-theme-editor-entity-info-hover active:!bg-theme-editor-entity-info-active'
            : '',
          entity.visual.warning
            ? '!bg-theme-editor-entity-warning hover:!bg-theme-editor-entity-warning-hover active:!bg-theme-editor-entity-warning-active'
            : '',
          entity.visual.error
            ? '!bg-theme-editor-entity-error hover:!bg-theme-editor-entity-error-hover active:!bg-theme-editor-entity-error-active'
            : '',
        ]
      }

      return { drop, menu, style, class: c }
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
          const item = el.innerHTML.replaceAll(utils.regex().htmlTags(), '')

          const target = utils.text().defaultWhitespace(item)

          return index(el) === target.length
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
              ASTUtils.normalize(entity.raw, {
                type: 'all',
                whitespace: true,
              }) || '',
              EXTERNALS.finder.value,
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
              ASTUtils.normalize(entity.raw, {
                type: 'all',
                whitespace: true,
              }) || '',
              EXTERNALS.switcher.value,
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

      return { editor, switcher, finder }
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
      purge,
      make,
      copy,
      support,
    }
  }

  return { v2 }
}
