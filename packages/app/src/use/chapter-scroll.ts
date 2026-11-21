/**
 * Per-chapter scroll position of the editor.
 *
 * The element that scrolls is `#entity-main` (EditorBase). `#edit` is
 * `overflow-hidden` and always reports 0.
 */

const EDITOR_SCROLL = '#entity-main'

// how long to wait for the chapter entities to render before giving up
const RESTORE_TIMEOUT = 1500

// when the caller scrolls by itself (graph, finder...), how long the
// previous chapter's offset may still be on screen
const SETTLE_TIMEOUT = 500

let pending = 0
let settling = false
let settleTimer: ReturnType<typeof setTimeout> | undefined

const settle = (ms?: number) => {
  settling = true

  clearTimeout(settleTimer)
  settleTimer =
    ms !== undefined ? setTimeout(() => (settling = false), ms) : undefined
}

const settled = () => {
  settling = false
  clearTimeout(settleTimer)
}

/**
 * Right after a chapter switch the store already points to the new chapter
 * while the editor still shows the previous chapter's offset. Saves that
 * happen in this window must not record it.
 */
export const isEditorScrollSettling = () => settling

export const getEditorScroll = (): number | undefined => {
  const el = document.querySelector<HTMLElement>(EDITOR_SCROLL)

  return el ? Math.floor(el.scrollTop) : undefined
}

/** cancels a restore in progress; the caller scrolls to its own target */
export const cancelEditorScrollRestore = () => {
  pending++
  settle(SETTLE_TIMEOUT)
}

/**
 * Scrolls the editor to `top` as soon as the chapter is tall enough.
 * Entities render progressively, so it retries every frame until the
 * position is reached, the user scrolls, or the timeout expires.
 */
export const restoreEditorScroll = (top: number = 0) => {
  const id = ++pending
  const start = performance.now()
  let last: number | undefined

  settle()

  const tick = () => {
    // another chapter was opened meanwhile; that call owns `settling`
    if (id !== pending) return

    const el = document.querySelector<HTMLElement>(EDITOR_SCROLL)
    const expired = performance.now() - start > RESTORE_TIMEOUT

    if (el) {
      // user scrolled by themselves meanwhile: respect it
      if (last !== undefined && Math.abs(el.scrollTop - last) > 1)
        return settled()

      el.scrollTop = top
      last = el.scrollTop

      if (Math.abs(el.scrollTop - top) <= 1) return settled()
    }

    if (expired) return settled()

    requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}
