import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const darkSet = (store: any) => {
  const dark = localStorage.getItem('theme')

  dark
    ? (document.querySelector('html') as HTMLElement).classList.add('dark')
    : (document.querySelector('html') as HTMLElement).classList.remove('dark')

  store.commit('editor/switchTheme', dark ? true : false)
}

const langSet = (store: any) => {
  const { locale } = useI18n()
  const lang = localStorage.getItem('lang')

  lang === 'br' ? (locale.value = 'br') : (locale.value = 'en')
}

export const useStart = () => {
  const store = useStore()

  const init = () => {
    darkSet(store)
    langSet(store)
  }

  return { init }
}
