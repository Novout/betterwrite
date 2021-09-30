import axios from 'axios'
import { Callback } from '@/types/utils'
import { GoogleFont } from '@/types/google'

export const useFonts: Callback<any> = () => {
  const get = (): Array<GoogleFont> => {
    const normalize: Array<GoogleFont> = []

    axios
      .get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${
          import.meta.env.VITE_GOOGLE_FONTS_KEY
        }&sort=popularity`
      )
      .then((res) => {
        let data = res.data

        data = data.forEach((obj: GoogleFont) => {
          normalize.push(obj)
        })
      })

    return normalize
  }

  return { get }
}
