import { ID } from 'better-write-types'

export const useScroll = () => {
  const force = (tag: string) => {
    setTimeout(() => {
      const scr = document.querySelector(tag)

      if (!scr) return
      ;(scr as HTMLElement).scrollTop = (scr as HTMLElement).scrollHeight
    }, 0)
  }

  const to = (tag: string, display?: string) => {
    if (display === 'center') {
      const scr = document.querySelector(tag)
      ;(scr as HTMLElement).scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      })

      return
    }

    const scr = document.querySelector(tag)
    ;(scr as HTMLElement).scrollIntoView()
  }

  const entity = (id: ID<number>, display?: 'center' | 'top' | 'bottom') => {
    const scr = document.querySelector(`#entity-${id}`)
    if (display === 'center') {
      ;(scr as HTMLElement).scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      })

      return
    }

    if (display === 'bottom') {
      ;(scr as HTMLElement).scrollIntoView({
        behavior: 'auto',
        block: 'end',
        inline: 'end',
      })

      return
    }

    if (display === 'top') {
      ;(scr as HTMLElement).scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'start',
      })

      return
    }

    ;(scr as HTMLElement).scrollIntoView()
  }

  return { force, entity, to }
}
