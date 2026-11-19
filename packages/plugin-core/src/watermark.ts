/**
 * Application logo rendered as a faded PNG with `betterwrite.io` at its
 * center, used as a watermark on the last page by the PDF and DOCX exporters.
 *
 * DOCX has no image opacity, so the transparency is baked into the PNG
 * (canvas `globalAlpha`), and the same image is reused by pdfmake.
 */

export interface Watermark {
  /** `data:image/png;base64,...` */
  dataUrl: string
  /** raw PNG bytes (docx ImageRun) */
  data: Uint8Array
  /** aspect ratio (width / height) of the logo */
  ratio: number
}

export interface WatermarkOptions {
  /** logo URL, defaults to the app logo served from /public */
  src?: string
  /** 0..1, defaults to 0.15 (lower values vanish on the light-gray shape) */
  opacity?: number
  /** rasterized height in px, defaults to 1200 (sharp when printed) */
  resolution?: number
  /** text drawn at the exact center, defaults to `betterwrite.io` */
  text?: string
  /** 0..1, text opacity, defaults to 0.45 */
  textOpacity?: number
}

const cache = new Map<string, Promise<Watermark | null>>()

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

const toBytes = (dataUrl: string) => {
  const binary = atob(dataUrl.split(',')[1])
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

const render = async ({
  src,
  opacity,
  resolution,
  text,
  textOpacity,
}: Required<WatermarkOptions>): Promise<Watermark | null> => {
  try {
    const [img] = await Promise.all([
      loadImage(src),
      // app font; falls back to sans-serif if unavailable
      document.fonts?.load(`bold 64px Poppins`).catch(() => {}),
    ])

    // SVGs without intrinsic size report 0 (or 150x300) — use the viewBox ratio
    const ratio =
      img.naturalWidth && img.naturalHeight
        ? img.naturalWidth / img.naturalHeight
        : 289.24 / 502.63

    const height = resolution
    const width = Math.round(height * ratio)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.globalAlpha = opacity
    ctx.drawImage(img, 0, 0, width, height)

    if (text) {
      // fit the text to 85% of the logo width, centered on both axes
      ctx.globalAlpha = textOpacity
      ctx.fillStyle = '#1F2937'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      let size = Math.round(height * 0.08)
      const font = (s: number) => `bold ${s}px Poppins, sans-serif`
      ctx.font = font(size)

      const max = width * 0.85
      const measured = ctx.measureText(text).width
      if (measured > max) {
        size = Math.floor((size * max) / measured)
        ctx.font = font(size)
      }

      ctx.fillText(text, width / 2, height / 2)
    }

    const dataUrl = canvas.toDataURL('image/png')

    return { dataUrl, data: toBytes(dataUrl), ratio }
  } catch {
    // never block an export because of the watermark
    return null
  }
}

export const getWatermark = (
  options: WatermarkOptions = {},
): Promise<Watermark | null> => {
  const resolved: Required<WatermarkOptions> = {
    // same convention as hooks.utils.path().resolve (public files at the root)
    src: options.src ?? '/logo_default.svg',
    opacity: options.opacity ?? 0.15,
    resolution: options.resolution ?? 1200,
    text: options.text ?? 'betterwrite.io',
    textOpacity: options.textOpacity ?? 0.45,
  }

  const key = JSON.stringify(resolved)

  if (!cache.has(key)) cache.set(key, render(resolved))

  return cache.get(key)!
}
