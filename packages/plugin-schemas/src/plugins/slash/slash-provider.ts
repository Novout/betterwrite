// Wrapper of original milkdown-plugin-slash
/* Copyright 2021, Milkdown by Mirone. */
import { findParentNode, posToDOMRect } from '@milkdown/prose'
import type { EditorState } from '@milkdown/prose/state'
import type { Node } from '@milkdown/prose/model'
import { TextSelection } from '@milkdown/prose/state'
import type { EditorView } from '@milkdown/prose/view'
import debounce from 'lodash.debounce'
import type { Instance, Props } from 'tippy.js'
import tippy from 'tippy.js'

/// Options for slash provider.
export type SlashProviderOptions = {
  /// The slash content.
  content: HTMLElement
  /// The options for creating [tippy.js](https://atomiks.github.io/tippyjs/) instance.
  tippyOptions?: Partial<Props>
  /// The debounce time for updating slash, 200ms by default.
  debounce?: number
  /// The function to determine whether the tooltip should be shown.
  shouldShow?: (view: EditorView, prevState?: EditorState) => boolean

  prefix?: string[]

  marks?: { prefix: string; links: { name: string; id: string }[] }[]

  markActive?: { prefix: string; links: { name: string; id: string }[] }
}

/// A provider for creating slash.
export class SlashProvider {
  /// The root element of the slash.
  element: HTMLElement

  /// @internal
  #tippy: Instance | undefined

  /// @internal
  #tippyOptions: Partial<Props>

  /// @internal
  #debounce: number

  /// @internal
  #marks: { prefix: string; links: { name: string; id: string }[] }[]

  /// @internal
  #markActive?: { prefix: string; links: { name: string; id: string }[] }

  /// @internal
  #shouldShow: (view: EditorView, prevState?: EditorState) => boolean

  constructor(options: SlashProviderOptions) {
    this.element = options.content
    this.#tippyOptions = options.tippyOptions ?? {}
    this.#debounce = options.debounce ?? 100
    this.#shouldShow = options.shouldShow ?? this.#_shouldShow
    this.#marks = options.marks ?? []
    this.#markActive = options.marks ? options.marks[0] : undefined
  }

  /// @internal
  #onUpdate = (view: EditorView, prevState?: EditorState): void => {
    const { state, composing } = view
    const { selection, doc } = state
    const { ranges } = selection
    const from = Math.min(...ranges.map((range) => range.$from.pos))
    const to = Math.max(...ranges.map((range) => range.$to.pos))
    const isSame =
      prevState && prevState.doc.eq(doc) && prevState.selection.eq(selection)

    this.#tippy ??= tippy(view.dom, {
      trigger: 'manual',
      placement: 'bottom-start',
      interactive: true,
      ...this.#tippyOptions,
      content: this.element,
    })

    if (composing || isSame) return

    if (!this.#shouldShow(view, prevState)) {
      this.hide()
      return
    }

    this.#tippy.setProps({
      getReferenceClientRect: () => posToDOMRect(view, from, to),
    })

    this.show()
  }

  /// @internal
  #_shouldShow(view: EditorView): boolean {
    // don't show in prod at this time.
    return false

    const currentTextBlockContent = this.getContent(view)

    if (!currentTextBlockContent) return false

    const mark = this.#marks.find(
      (item) => currentTextBlockContent?.at(-1) === item.prefix
    )

    if (mark) {
      this.#markActive = this.#marks.find((mark) => mark.prefix === mark.prefix)
    }

    return !!mark
  }

  /// Update provider state by editor view.
  update = (view: EditorView, prevState?: EditorState): void => {
    const updater = debounce(this.#onUpdate, this.#debounce)

    updater(view, prevState)
  }

  /// Get the content of the current text block.
  /// Pass the `matchNode` function to determine whether the current node should be matched, by default, it will match the paragraph node.
  getContent = (
    view: EditorView,
    matchNode: (node: Node) => boolean = (node) =>
      node.type.name === 'paragraph'
  ): string | undefined => {
    const { selection } = view.state
    const { empty } = selection
    const isTextBlock = view.state.selection instanceof TextSelection

    const isSlashChildren = this.element.contains(document.activeElement)

    const notHasFocus = !view.hasFocus() && !isSlashChildren

    const isReadonly = !view.editable

    const paragraph = findParentNode(matchNode)(view.state.selection)

    const isNotInParagraph = !paragraph

    if (notHasFocus || isReadonly || !empty || !isTextBlock || isNotInParagraph)
      return

    return paragraph.node.textContent
  }

  /// Destroy the slash.
  destroy = () => {
    this.#tippy?.destroy()
  }

  /// Show the slash.
  show = () => {
    this.element.innerHTML =
      this.#markActive?.links.reduce((acc, item) => {
        return (acc += `<div id=\"${
          item.id
        }\" class=\"flex flex-col gap-2 bg-theme-background-3 p-2\">${
          this.#markActive?.prefix ?? ''
        } ${item.name}</div>`)
      }, '<div class="bg-theme-background-2 wb-text w-full p-2 cursor-pointer min-w-20">') ??
      '<div>'
    this.element.innerHTML = this.element.innerHTML += '</div>'
    this.element.onclick = (e) => {
      this.hide()
    }

    this.#tippy?.show()

    setTimeout(() => {
      this.#markActive?.links.forEach(link => {
        const el = document.querySelector(`#${link.id}`) as HTMLDivElement

        el?.addEventListener('click', () => {})
      })
    }, 500)
  }

  /// Hide the slash.
  hide = () => {
    this.#tippy?.hide()
  }

  /// Get the [tippy.js](https://atomiks.github.io/tippyjs/) instance.
  getInstance = () => this.#tippy
}
