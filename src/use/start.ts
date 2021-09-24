import { Store, useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { Callback } from '@/types/utils'
import { usePDF } from './pdf'

const mode: Callback<void> = () => {
  if (import.meta.env.MODE === 'production') {
    console.log = () => {}
    console.warn = () => {}
    console.info = () => {}
    console.debug = () => {}
  }
}

const darkSet: Callback<Store<any>, void> = (store: Store<any>) => {
  const dark = localStorage.getItem('theme')

  dark
    ? (document.querySelector('html') as HTMLElement).classList.add('dark')
    : (document.querySelector('html') as HTMLElement).classList.remove('dark')

  store.commit('editor/switchTheme', dark ? true : false)
}

const langSet: Callback<Store<any>, void> = (store: Store<any>) => {
  const { locale } = useI18n()
  const lang = localStorage.getItem('lang')

  lang === 'br' ? (locale.value = 'br') : (locale.value = 'en')

  lang === 'br'
    ? ((document.querySelector('html') as HTMLElement).lang = 'pt-BR')
    : ((document.querySelector('html') as HTMLElement).lang = 'en-US')
}

export const useStart: Callback<void> = () => {
  const store = useStore()

  const init = () => {
    mode()
    darkSet(store)
    langSet(store)
    usePDF().init()
  }

  return { init }
}
