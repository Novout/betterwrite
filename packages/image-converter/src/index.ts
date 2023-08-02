import {
  ImageToForcePNGOptions,
  ImageFileRawOptions,
  ImageFileRawReturn,
} from 'better-write-types'
import Compressor from 'compressorjs'

export const isImageExtension = (text: string) => {
  return (
    text.endsWith('.png') ||
    text.endsWith('.jpg') ||
    text.endsWith('.jpeg') ||
    text.endsWith('.svg') ||
    text.endsWith('.gif')
  )
}

export const ImageToForcePNG = (
  options: ImageToForcePNGOptions,
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

export const getFileOrBlobResult = (
  file: File | Blob,
): Promise<ImageFileRawReturn> => {
  return new Promise((res, rej) => {
    const reader = new FileReader()

    const isSvg = file.name.endsWith('.svg')

    if (isSvg) {
      reader.readAsText(file)
    } else {
      reader.readAsDataURL(file)
    }

    reader.onload = async () => {
      if (!isImageExtension(file.name) || !reader.result) {
        rej()
        return
      }

      const raw = isSvg
        ? await ImageToForcePNG({
            raw: reader.result as string,
            width: 2000 as number,
            height: 2000 as number,
          })
        : (reader.result as string)

      res({
        raw,
        fileName: file.name,
        fileSize: file.size,
      })
    }
    reader.onerror = function () {
      rej()
    }
  })
}

export const getImageFileRaw = (
  options?: ImageFileRawOptions,
): Promise<ImageFileRawReturn> => {
  return new Promise((res, rej) => {
    const _ = document.createElement('input')
    _.type = 'file'
    _.accept = options?.accept || '.png, .svg, .jpg, .jpeg'
    _.addEventListener('change', async function () {
      const files = this.files

      if (!files || files.length === 0) {
        rej()

        return
      }

      const file = files[0]

      if (options?.compress?.value && file.type !== 'image/gif') {
        new Compressor(file, {
          quality: options?.compress?.quality ?? 1.0,
          async success(compressed) {
            const data = await getFileOrBlobResult(compressed)

            data ? res(data) : rej(data)
          },
          error(err) {
            rej(err)
          },
        })

        return
      }

      const data = await getFileOrBlobResult(file)

      data ? res(data) : rej(data)
    })
    _.click()
  })
}
