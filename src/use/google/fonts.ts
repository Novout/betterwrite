import axios from 'axios'
import { GoogleFont } from '@/types/google'
import { useEnv } from '../env'
import { useDefines } from '../defines'
import isElectron from 'is-electron'

export const useFonts = () => {
  const setGlobal = (vfs: Record<any, any>) => {
    const _style = document.createElement('style')

    Object.entries(vfs).forEach((font: Array<any>) => {
      const key = font[0]
      const content = font[1]
      _style.appendChild(
        document.createTextNode(
          '\
      @font-face {\
          font-family: ' +
            key +
            ";\
          src: url('" +
            content.normal +
            "');\
      }\
      "
        )
      )
    })

    document.head.appendChild(_style)
  }

  const get = async () => {
    if (isElectron()) {
      const normalize = {}
      const names: Array<any> = []

      return { normalize, names }
    }

    let normalize: Record<string, any> = {}
    const names: Array<string> = []

    const { data } = await axios.get(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${
        import.meta.env.VITE_GOOGLE_FONTS_KEY
      }&sort=popularity`
    )

    useDefines()
      .pdf()
      .fixFonts()
      .forEach((font: string) => {
        const fonts = data.items.filter(
          (obj: GoogleFont) => obj.family === font
        )

        fonts.forEach((obj: GoogleFont) => {
          if (!obj.files['regular']) return

          normalize[obj.family] = {
            normal: obj.files['regular'].replace('http', 'https'),
            italics: obj.files['italic']
              ? obj.files['italic'].replace('http', 'https')
              : obj.files['regular'].replace('http', 'https'),
            bold: obj.files['700']
              ? obj.files['700'].replace('http', 'https')
              : obj.files['regular'].replace('http', 'https'),
            bolditalics: obj.files['700italic']
              ? obj.files['700italic'].replace('http', 'https')
              : obj.files['regular'].replace('http', 'https'),
          }

          names.push(obj.family)
        })
      })

    data.items.forEach((obj: GoogleFont) => {
      if (
        !obj.files['regular'] ||
        Object.keys(normalize).length >= useEnv().maxFonts() ||
        names.includes(obj.family)
      )
        return

      normalize[obj.family] = {
        normal: obj.files['regular'].replace('http', 'https'),
        italics: obj.files['italic']
          ? obj.files['italic'].replace('http', 'https')
          : obj.files['regular'].replace('http', 'https'),
        bold: obj.files['700']
          ? obj.files['700'].replace('http', 'https')
          : obj.files['regular'].replace('http', 'https'),
        bolditalics: obj.files['700italic']
          ? obj.files['700italic'].replace('http', 'https')
          : obj.files['regular'].replace('http', 'https'),
      }

      names.push(obj.family)
    })

    names.sort()

    setGlobal(normalize)

    return { normalize, names }
  }

  return { get }
}
