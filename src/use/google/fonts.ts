import axios from 'axios'
import { Callback } from '@/types/utils'
import { GoogleFont } from '@/types/google'
import { useEnv } from '../env'

export const useFonts: Callback<any> = () => {
  const get = async () => {
    let normalize: Record<string, any> = {}
    const names: Array<string> = []

    const { data } = await axios.get(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${
        import.meta.env.VITE_GOOGLE_FONTS_KEY
      }&sort=popularity`
    )

    data.items.forEach((obj: GoogleFont) => {
      if (
        !obj.files['regular'] ||
        Object.keys(normalize).length >= useEnv().maxFonts()
      )
        return

      normalize[obj.family] = {
        normal: obj.files['regular'],
        italics: obj.files['italic']
          ? obj.files['italic']
          : obj.files['regular'],
        bold: obj.files['700'] ? obj.files['700'] : obj.files['regular'],
        bolditalics: obj.files['700italic']
          ? obj.files['700italic']
          : obj.files['regular'],
      }

      names.push(obj.family)
    })

    names.sort()

    return { normalize, names }
  }

  return { get }
}
