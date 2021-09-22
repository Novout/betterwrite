export const useScroll = () => {
  const force = (tag: string) => {
    setTimeout(() => {
      const scr = document.querySelector(tag)
      ;(scr as HTMLElement).scrollTop = (scr as HTMLElement).scrollHeight
    }, 0)
  }

  const to = (tag: string) => {
    const scr = document.querySelector(tag)
    ;(scr as HTMLElement).scrollIntoView()
  }

  return { force, to }
}
