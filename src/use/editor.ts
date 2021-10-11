export const useEditor = () => {
  const fullScreen = (): void => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      return
    }

    document.body.requestFullscreen()
  }

  return { fullScreen }
}
