export const useScroll = () => {
  const force = (tag: string) => {
    setTimeout(() => {
      const scr = document.querySelector(tag)
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

  return { force, to }
}
