import { GoogleFont, GoogleFontsGetOption } from 'better-write-types'
import { $fetch } from 'ohmyfetch'

export const setGlobal = (vfs: Record<any, any>) => {
  const _style = document.createElement('style')

  Object.entries(vfs).forEach(([key, content]: Array<any>) => {
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
    ",
      ),
    )
  })

  document.head.appendChild(_style)
}

export const get = async (options: GoogleFontsGetOption) => {
  let normalize: Record<string, any> = {}
  const names: Array<string> = []

  await $fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${options.key}&sort=popularity`,
    {
      retry: 3,
      async onResponse({ response }) {
        const data = await response._data

        data.items.forEach((item: GoogleFont) => {
          if (item.files['regular'])
            item.files['regular'] = item.files['regular'].replace(
              /^http:\/\//i,
              'https://',
            )
          if (item.files['italic'])
            item.files['italic'] = item.files['italic'].replace(
              /^http:\/\//i,
              'https://',
            )
          if (item.files['700'])
            item.files['700'] = item.files['700'].replace(
              /^http:\/\//i,
              'https://',
            )
          if (item.files['700italic'])
            item.files['700italic'] = item.files['700italic'].replace(
              /^http:\/\//i,
              'https://',
            )

          if (Object.keys(normalize).length < options.maxFonts) {
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

        options.requiredFonts.forEach((font: string) => {
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

        if (options.globalStyle) setGlobal(normalize)
      },
    },
  ).catch(() => {})

  return { normalize, names }
}
