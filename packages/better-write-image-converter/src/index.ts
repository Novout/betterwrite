import { ImageToForcePNGOptions } from 'better-write-types'

export const ImageToForcePNG = (
  options: ImageToForcePNGOptions
): Promise<string> => {
  return new Promise((res, rej) => {
    if (!options.raw.startsWith('<svg') && !options.raw.endsWith('svg>')) {
      res(options.raw)

      return
    }

    // convert svg to png
    const blob = new Blob([options.raw], {
      type: 'image/svg+xml;charset=utf-8',
    })

    const URL = window.URL || window.webkitURL || window

    const blobURL = URL.createObjectURL(blob)

    const image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = () => {
      const canvas = document.createElement('canvas')

      canvas.width = options.width
      canvas.height = options.height

      const context = canvas.getContext('2d') as CanvasRenderingContext2D

      context.drawImage(image, 0, 0, options.width, options.height)

      const url = canvas.toDataURL('image/png')

      res(url)
    }
    image.onerror = () => {
      rej()
    }

    // TODO: other blob performatic method
    image.src = blobURL
  })
}
