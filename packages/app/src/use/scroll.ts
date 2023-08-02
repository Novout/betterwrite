import { ID } from 'better-write-types'

export const useScroll = () => {
  const force = (tag: string) => {
    setTimeout(() => {
      const scr = document.querySelector(tag)

      if (!scr?.scrollTop) return
      ;(scr as HTMLElement).scrollTop = (scr as HTMLElement).scrollHeight
    }, 0)
  }

  const to = (tag: string, display?: string) => {
    if (display === 'center') {
      const scr = document.querySelector(tag)
      ;(scr as HTMLElement)?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      })

      return
    }

    const scr = document.querySelector(tag)
    ;(scr as HTMLElement)?.scrollIntoView()
  }

  const entity = (
    id: ID<number | string>,
    display?: 'center' | 'top' | 'bottom',
  ) => {
    const scr = document.querySelector(`#entity-${id}`)
    if (display === 'center') {
      ;(scr as HTMLElement)?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      })

      return
    }

    if (display === 'bottom') {
      ;(scr as HTMLElement)?.scrollIntoView({
        behavior: 'auto',
        block: 'end',
        inline: 'end',
      })

      return
    }

    if (display === 'top') {
      ;(scr as HTMLElement)?.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'start',
      })

      return
    }

    ;(scr as HTMLElement)?.scrollIntoView()
  }

  const editor = () => {
    const get = () => {
      const doc = document.querySelector('#edit')

      return doc?.scrollTop || 0
    }

    const set = (value: number) => {
      const doc = document.querySelector('#edit')

      if (!doc) return

      doc.scrollTop = value
    }

    return { get, set }
  }

  return { force, entity, to, editor }
}
