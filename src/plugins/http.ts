import axios from 'axios'

export const googleFontsAxiosInstance = axios.create({
  baseURL: `https://www.googleapis.com/webfonts/v1/webfonts?key=${
    import.meta.env.VITE_GOOGLE_FONTS_KEY
  }&sort=popularity`,
})
