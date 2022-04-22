import destr from 'destr'
import { GoogleFont } from 'better-write-types'
import { useEnv } from '../env'
import { useDefines } from '../defines'
import { useFetch } from '@vueuse/core'

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
    let normalize: Record<string, any> = {}
    const names: Array<string> = []

    await useFetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${
        import.meta.env.VITE_GOOGLE_FONTS_KEY
      }&sort=popularity`,
      {
        afterFetch(ctx) {
          const data = destr(ctx.data)

          data.items.forEach((item: GoogleFont) => {
            if (item.files['regular'])
              item.files['regular'] = item.files['regular'].replace(
                /^http:\/\//i,
                'https://'
              )
            if (item.files['italic'])
              item.files['italic'] = item.files['italic'].replace(
                /^http:\/\//i,
                'https://'
              )
            if (item.files['700'])
              item.files['700'] = item.files['700'].replace(
                /^http:\/\//i,
                'https://'
              )
            if (item.files['700italic'])
              item.files['700italic'] = item.files['700italic'].replace(
                /^http:\/\//i,
                'https://'
              )

            if (Object.keys(normalize).length < useEnv().maxFonts()) {
              normalize[item.family] = {
                normal: item.files['regular'],
                italics: item.files['italic']
                  ? item.files['italic']
                  : item.files['regular'],
                bold: item.files['700']
                  ? item.files['700']
                  : item.files['regular'],
                bolditalics: item.files['700italic']
                  ? item.files['700italic']
                  : item.files['regular'],
              }
            }
          })

          useDefines()
            .pdf()
            .fixFonts()
            .forEach((font: string) => {
              data.items.forEach((obj: GoogleFont) => {
                if (obj.files['regular']) {
                  if (obj.family === font && !names.includes(obj.family)) {
                    names.push(obj.family)
                  }
                }
              })
            })

          Object.entries(normalize).forEach((item) => {
            if (!names.includes(item[0])) names.push(item[0])
          })

          names.sort()

          setGlobal(normalize)

          ctx.data = JSON.stringify(data)

          return ctx
        },
      }
    )

    return { normalize, names }
  }

  return { get }
}
